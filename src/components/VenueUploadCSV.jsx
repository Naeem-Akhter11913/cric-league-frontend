import React, { useState, useRef, useCallback } from 'react';
import Papa from 'papaparse';
import { Upload, Trash2, ImagePlus, X, FileUp, Check, Loader2 } from 'lucide-react';

// ---- Static dropdown options ----------------------------------------------
const SURFACE_TYPES = ['Turf', 'Matting', 'Astroturf', 'Cement', 'Grass'];
const SURFACE_BEHAVIORS = [
  'Fast and bouncy',
  'Slow and low',
  'True bounce',
  'Spin friendly',
  'Medium pace friendly',
];
const COUNTRIES = ['India', 'Nepal', 'Sri Lanka', 'Bangladesh', 'Other'];
const STATES = [
  'Andhra Pradesh', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan',
  'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

let rowIdCounter = 1;
const makeId = () => `row-${rowIdCounter++}-${Date.now()}`;

// Blank row shape mirrors the Venue schema (flattened for table editing)
const emptyVenue = () => ({
  id: makeId(),
  name: '',
  city: '',
  surfaceType: '',
  surfaceBehavior: '',
  capacity: '',
  floodLights: true,
  pitchCount: '',
  addressLine1: '',
  addressLine2: '',
  area: '',
  state: '',
  country: 'India',
  pincode: '',
  contactName: '',
  contactNumber: '',
  contactEmail: '',
  description: '',
  amenities: '',
  images: [], // [{ id, file, url, name }]
  status: 'idle', // idle | uploading | uploaded | error
});

function csvRowToVenue(row) {
  return {
    ...emptyVenue(),
    name: row.name || '',
    city: row.city || '',
    surfaceType: row.surfaceType || '',
    surfaceBehavior: row.surfaceBehavior || '',
    capacity: row.capacity || '',
    floodLights: String(row.floodLights).toLowerCase() !== 'false',
    pitchCount: row.pitchCount || '',
    addressLine1: row.addressLine1 || '',
    addressLine2: row.addressLine2 || '',
    area: row.area || '',
    state: row.state || '',
    country: row.country || 'India',
    pincode: row.pincode || '',
    contactName: row.contactName || '',
    contactNumber: row.contactNumber || '',
    contactEmail: row.contactEmail || '',
    description: row.description || '',
    amenities: row.amenities || '',
    // CSV can only ever reference image filenames, not actual binary files —
    // keep them as placeholder chips the user can replace via the file picker.
    images: (row.images || '')
      .split('|')
      .filter(Boolean)
      .map((name) => ({ id: makeId(), file: null, url: null, name })),
  };
}

// ---- Small reusable cell inputs -------------------------------------------
const cellInputClass =
  'w-full min-w-[120px] bg-transparent px-2 py-1.5 text-sm text-[var(--vc-text)] ' +
  'border border-transparent rounded-md focus:outline-none focus:border-[var(--vc-gold)] ' +
  'focus:bg-white/60 transition-colors';

function TextCell({ value, onChange, placeholder, width }) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={cellInputClass}
      style={{ minWidth: width || 120 }}
    />
  );
}

function SelectCell({ value, onChange, options, width }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cellInputClass + ' cursor-pointer'}
      style={{ minWidth: width || 140 }}
    >
      <option value="">Select...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default function VenueUploadCSV() {
  const [venues, setVenues] = useState([]);
  const [parseError, setParseError] = useState('');
  const fileInputRef = useRef(null);

  // ---- CSV upload ----------------------------------------------------------
  const handleCsvSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setParseError('');

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data.length) {
          setParseError('No rows found in that CSV.');
          return;
        }
        const parsed = results.data.map(csvRowToVenue);
        setVenues((prev) => [...prev, ...parsed]);
      },
      error: (err) => setParseError(err.message || 'Failed to parse CSV.'),
    });

    e.target.value = ''; // allow re-selecting the same file later
  }, []);

  const handleAddRow = () => setVenues((prev) => [...prev, emptyVenue()]);

  // ---- Field editing ---------------------------------------------------------
  const updateField = useCallback((id, field, value) => {
    setVenues((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  }, []);

  // ---- Image handling --------------------------------------------------------
  const addImages = useCallback((id, fileList) => {
    const newImages = Array.from(fileList).map((file) => ({
      id: makeId(),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setVenues((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, images: [...v.images, ...newImages] } : v
      )
    );
  }, []);

  const removeImage = useCallback((rowId, imageId) => {
    setVenues((prev) =>
      prev.map((v) => {
        if (v.id !== rowId) return v;
        const img = v.images.find((i) => i.id === imageId);
        if (img?.url) URL.revokeObjectURL(img.url);
        return { ...v, images: v.images.filter((i) => i.id !== imageId) };
      })
    );
  }, []);

  // ---- Row actions ------------------------------------------------------------
  const deleteRow = useCallback((id) => {
    setVenues((prev) => {
      const row = prev.find((v) => v.id === id);
      row?.images.forEach((img) => img.url && URL.revokeObjectURL(img.url));
      return prev.filter((v) => v.id !== id);
    });
  }, []);

  const uploadRow = useCallback(async (id) => {
    setVenues((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'uploading' } : v))
    );

    try {
      const row = venues.find((v) => v.id === id);
      const formData = new FormData();

      formData.append('name', row.name);
      formData.append('city', row.city);
      formData.append('surface[type]', row.surfaceType);
      formData.append('surface[behavior]', row.surfaceBehavior);
      formData.append('capacity', row.capacity);
      formData.append('floodLights', row.floodLights);
      formData.append('pitchCount', row.pitchCount);
      formData.append('address[line1]', row.addressLine1);
      formData.append('address[line2]', row.addressLine2);
      formData.append('address[area]', row.area);
      formData.append('address[state]', row.state);
      formData.append('address[country]', row.country);
      formData.append('address[pincode]', row.pincode);
      formData.append('contact[name]', row.contactName);
      formData.append('contact[number]', row.contactNumber);
      formData.append('contact[email]', row.contactEmail);
      formData.append('description', row.description);
      formData.append('amenities', row.amenities);
      row.images.forEach((img) => {
        if (img.file) formData.append('images', img.file);
      });

      // TODO: point this at your real endpoint
      const res = await fetch('/api/venues', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');

      setVenues((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: 'uploaded' } : v))
      );
    } catch (err) {
      setVenues((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: 'error' } : v))
      );
    }
  }, [venues]);

  const columns = [
    'Name', 'City', 'Surface Type', 'Surface Behavior', 'Capacity',
    'Flood Lights', 'Pitches', 'Address Line 1', 'Address Line 2', 'Area',
    'State', 'Country', 'Pincode', 'Contact Name', 'Contact Number',
    'Contact Email', 'Description', 'Amenities', 'Images', 'Actions',
  ];

  return (
    <div
      className="min-h-screen w-[90vw] p-6"
      style={{
        // Falls back to a cream/gold/dark-green palette if the app's own
        // CSS variables (--color-cream etc.) aren't present.
        '--vc-cream': 'var(--color-cream, #F7F2E7)',
        '--vc-gold': 'var(--color-gold, #C9A227)',
        '--vc-green': 'var(--color-dark-green, #1F3D2B)',
        '--vc-text': 'var(--color-text, #2B2A25)',
        background: 'var(--vc-cream)',
      }}
    >
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: 'var(--vc-green)' }}>
              Venue CSV Upload
            </h1>
            <p className="text-sm text-[var(--vc-text)]/70">
              Import venues, edit inline, then upload each row.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddRow}
              className="px-3 py-2 rounded-md text-sm font-medium border"
              style={{ borderColor: 'var(--vc-green)', color: 'var(--vc-green)' }}
            >
              + Add row
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-white"
              style={{ background: 'var(--vc-green)' }}
            >
              <FileUp size={16} />
              Upload CSV
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleCsvSelect}
              className="hidden"
            />
          </div>
        </div>

        {parseError && (
          <div className="mb-4 px-3 py-2 rounded-md text-sm bg-red-100 text-red-700 border border-red-300">
            {parseError}
          </div>
        )}

        {venues.length === 0 ? (
          <div
            className="border-2 border-dashed rounded-lg p-12 text-center text-sm text-[var(--vc-text)]/60"
            style={{ borderColor: 'var(--vc-gold)' }}
          >
            No venues yet. Upload a CSV or add a row to get started.
          </div>
        ) : (
          <div
            className="overflow-x-auto rounded-lg border"
            style={{ borderColor: 'var(--vc-gold)' }}
          >
            <table className="min-w-full border-collapse">
              <thead>
                <tr style={{ background: 'var(--vc-green)' }}>
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="text-left text-xs font-semibold uppercase tracking-wide text-white px-3 py-2 whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {venues.map((v, idx) => (
                  <tr
                    key={v.id}
                    className="border-t"
                    style={{
                      borderColor: 'var(--vc-gold)',
                      background: idx % 2 === 0 ? 'rgba(255,255,255,0.4)' : 'transparent',
                    }}
                  >
                    <td><TextCell value={v.name} onChange={(val) => updateField(v.id, 'name', val)} width={140} /></td>
                    <td><TextCell value={v.city} onChange={(val) => updateField(v.id, 'city', val)} width={110} /></td>
                    <td><SelectCell value={v.surfaceType} onChange={(val) => updateField(v.id, 'surfaceType', val)} options={SURFACE_TYPES} /></td>
                    <td><SelectCell value={v.surfaceBehavior} onChange={(val) => updateField(v.id, 'surfaceBehavior', val)} options={SURFACE_BEHAVIORS} width={170} /></td>
                    <td><TextCell value={v.capacity} onChange={(val) => updateField(v.id, 'capacity', val)} width={90} /></td>
                    <td>
                      <select
                        value={String(v.floodLights)}
                        onChange={(e) => updateField(v.id, 'floodLights', e.target.value === 'true')}
                        className={cellInputClass + ' cursor-pointer'}
                        style={{ minWidth: 90 }}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </td>
                    <td><TextCell value={v.pitchCount} onChange={(val) => updateField(v.id, 'pitchCount', val)} width={80} /></td>
                    <td><TextCell value={v.addressLine1} onChange={(val) => updateField(v.id, 'addressLine1', val)} width={150} /></td>
                    <td><TextCell value={v.addressLine2} onChange={(val) => updateField(v.id, 'addressLine2', val)} width={150} /></td>
                    <td><TextCell value={v.area} onChange={(val) => updateField(v.id, 'area', val)} width={110} /></td>
                    <td><SelectCell value={v.state} onChange={(val) => updateField(v.id, 'state', val)} options={STATES} width={140} /></td>
                    <td><SelectCell value={v.country} onChange={(val) => updateField(v.id, 'country', val)} options={COUNTRIES} width={110} /></td>
                    <td><TextCell value={v.pincode} onChange={(val) => updateField(v.id, 'pincode', val)} width={90} /></td>
                    <td><TextCell value={v.contactName} onChange={(val) => updateField(v.id, 'contactName', val)} width={130} /></td>
                    <td><TextCell value={v.contactNumber} onChange={(val) => updateField(v.id, 'contactNumber', val)} width={120} /></td>
                    <td><TextCell value={v.contactEmail} onChange={(val) => updateField(v.id, 'contactEmail', val)} width={170} /></td>
                    <td><TextCell value={v.description} onChange={(val) => updateField(v.id, 'description', val)} width={220} /></td>
                    <td><TextCell value={v.amenities} onChange={(val) => updateField(v.id, 'amenities', val)} placeholder="Parking|Nets" width={150} /></td>

                    {/* Images */}
                    <td>
                      <div className="flex items-center gap-1.5 flex-wrap" style={{ minWidth: 140 }}>
                        {v.images.map((img) => (
                          <div key={img.id} className="relative group">
                            {img.url ? (
                              <img
                                src={img.url}
                                alt={img.name}
                                className="w-9 h-9 object-cover rounded-md border"
                                style={{ borderColor: 'var(--vc-gold)' }}
                              />
                            ) : (
                              <div
                                className="w-9 h-9 flex items-center justify-center rounded-md border text-[9px] px-0.5 text-center leading-tight"
                                style={{ borderColor: 'var(--vc-gold)' }}
                                title={img.name}
                              >
                                {img.name.slice(0, 6)}
                              </div>
                            )}
                            <button
                              onClick={() => removeImage(v.id, img.id)}
                              className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                        <label
                          className="w-9 h-9 flex items-center justify-center rounded-md border border-dashed cursor-pointer"
                          style={{ borderColor: 'var(--vc-gold)', color: 'var(--vc-green)' }}
                        >
                          <ImagePlus size={16} />
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => e.target.files?.length && addImages(v.id, e.target.files)}
                          />
                        </label>
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => uploadRow(v.id)}
                          disabled={v.status === 'uploading'}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-white disabled:opacity-60"
                          style={{
                            background:
                              v.status === 'uploaded' ? '#2f7d4f' : 'var(--vc-green)',
                          }}
                        >
                          {v.status === 'uploading' ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : v.status === 'uploaded' ? (
                            <Check size={13} />
                          ) : (
                            <Upload size={13} />
                          )}
                          {v.status === 'uploading'
                            ? 'Uploading'
                            : v.status === 'uploaded'
                            ? 'Uploaded'
                            : 'Upload'}
                        </button>
                        <button
                          onClick={() => deleteRow(v.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium border border-red-300 text-red-600"
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                      {v.status === 'error' && (
                        <p className="text-[10px] text-red-600 mt-1">Upload failed</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}