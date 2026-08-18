import React, { useState, useCallback } from "react";
import {
  Building2,
  Image as ImageIcon,
  User,
  MapPin,
  Info,
  ArrowLeft,
  Upload,
  X,
  Plus,
  LocateFixed,
  Mail,
  Phone,
  MapPinned,
} from "lucide-react";

const SURFACE_TYPES = ["Turf / Grass", "Matting", "Astroturf", "Cement / Concrete", "Clay"];
const SURFACE_BEHAVIORS = ["Batting Friendly", "Bowling Friendly", "Balanced", "Spin Friendly", "Pace Friendly"];
const AMENITIES = ["Parking", "Changing Room", "Water", "Washroom", "Refreshments", "First Aid", "Other"];

const initialState = {
  venueName: "",
  city: "",
  addressLine1: "",
  addressLine2: "",
  state: "",
  country: "",
  pincode: "",
  surfaceType: "",
  surfaceBehavior: "",
  capacity: "",
  floodLights: "yes",
  indoorOutdoor: "outdoor",
  pitchCount: "",
  latitude: "",
  longitude: "",
  mapLocation: "",
  contactName: "",
  contactNumber: "",
  email: "",
  description: "",
  amenities: [],
  images: [],
};

function Field({ label, required, children, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ icon: Icon, error, className = "", ...props }) {
  return (
    <div className="relative">
      <input
        {...props}
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 ${
          Icon ? "pr-10" : ""
        } ${error ? "border-rose-400" : "border-slate-200"} ${className}`}
      />
      {Icon && (
        <Icon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      )}
    </div>
  );
}

function Select({ children, className = "", ...props }) {
  return (
    <select
      {...props}
      className={`w-full appearance-none rounded-lg border border-slate-200 bg-white bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 ${className}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/></svg>\")",
      }}
    >
      {children}
    </select>
  );
}

function RadioPill({ name, value, current, onChange, label }) {
  const active = current === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
        active
          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          active ? "border-indigo-600" : "border-slate-300"
        }`}
      >
        {active && <span className="h-2 w-2 rounded-full bg-indigo-600" />}
      </span>
      {label}
    </button>
  );
}

function SectionCard({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-slate-800 sm:text-base">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function AddNewVenue({ onSubmit, onCancel }) {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const update = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }, []);

  const toggleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleFiles = (fileList) => {
    const files = Array.from(fileList).slice(0, 5 - form.images.length);
    const mapped = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setForm((prev) => ({ ...prev, images: [...prev.images, ...mapped].slice(0, 5) }));
  };

  const removeImage = (index) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const validate = () => {
    const required = ["venueName", "city", "addressLine1", "state", "country", "pincode", "surfaceType", "capacity", "latitude", "longitude"];
    const next = {};
    required.forEach((key) => {
      if (!String(form[key]).trim()) next[key] = true;
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildPayload = () => ({
    venueName: form.venueName.trim(),
    city: form.city,
    address: {
      line1: form.addressLine1.trim(),
      line2: form.addressLine2.trim() || null,
      state: form.state,
      country: form.country,
      pincode: form.pincode.trim(),
    },
    surface: {
      type: form.surfaceType,
      behavior: form.surfaceBehavior || null,
    },
    capacity: Number(form.capacity) || 0,
    floodLights: form.floodLights === "yes",
    indoorOutdoor: form.indoorOutdoor,
    pitchCount: form.pitchCount ? Number(form.pitchCount) : null,
    location: {
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
      mapLocation: form.mapLocation.trim() || null,
    },
    contact: {
      name: form.contactName.trim() || null,
      number: form.contactNumber.trim() || null,
      email: form.email.trim() || null,
    },
    description: form.description.trim() || null,
    amenities: form.amenities,
    images: form.images.map((img) => img.file),
  });

  const submit = async (addAnother) => {
    // if (!validate()) return;
    const payload = buildPayload();
    console.log(payload);
    return;
    try {
      setSubmitting(true);
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        // eslint-disable-next-line no-console
        console.log("Venue payload ready for dispatch:", payload);
      }
      if (addAnother) {
        setForm(initialState);
        setErrors({});
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-2 py-2 sm:px-2 lg:px-2">
      <div className="mx-auto max-w-6xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(false);
          }}
        >
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
            {/* Left column */}
            <div className="flex flex-col gap-5 lg:col-span-3">
              <SectionCard icon={Building2} title="Basic Information">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Venue Name" required>
                    <TextInput
                      placeholder="Enter venue name"
                      value={form.venueName}
                      onChange={(e) => update("venueName", e.target.value)}
                      error={errors.venueName}
                    />
                  </Field>
                  <Field label="City" required>
                    <Select value={form.city} onChange={(e) => update("city", e.target.value)}>
                      <option value="">Select city</option>
                      <option>Faridabad</option>
                      <option>Delhi</option>
                      <option>Mumbai</option>
                      <option>Bengaluru</option>
                      <option>Chennai</option>
                    </Select>
                  </Field>
                  <Field label="Address Line 1" required className="sm:col-span-2">
                    <TextInput
                      placeholder="Enter address line 1"
                      value={form.addressLine1}
                      onChange={(e) => update("addressLine1", e.target.value)}
                      error={errors.addressLine1}
                    />
                  </Field>
                  <Field label="Address Line 2" className="sm:col-span-2">
                    <TextInput
                      placeholder="Enter address line 2 (optional)"
                      value={form.addressLine2}
                      onChange={(e) => update("addressLine2", e.target.value)}
                    />
                  </Field>
                  <Field label="State / Province" required>
                    <Select value={form.state} onChange={(e) => update("state", e.target.value)}>
                      <option value="">Select state</option>
                      <option>Haryana</option>
                      <option>Delhi</option>
                      <option>Maharashtra</option>
                      <option>Karnataka</option>
                      <option>Tamil Nadu</option>
                    </Select>
                  </Field>
                  <Field label="Country" required>
                    <Select value={form.country} onChange={(e) => update("country", e.target.value)}>
                      <option value="">Select country</option>
                      <option>India</option>
                      <option>Australia</option>
                      <option>England</option>
                      <option>South Africa</option>
                    </Select>
                  </Field>
                  <Field label="Pincode / Zip Code" required>
                    <TextInput
                      placeholder="Enter pincode"
                      value={form.pincode}
                      onChange={(e) => update("pincode", e.target.value)}
                      error={errors.pincode}
                    />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard icon={ImageIcon} title="Venue Images">
                <p className="-mt-3 mb-4 text-xs text-slate-400">Upload images of the venue (Max 5 images)</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <label className="col-span-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-3 py-6 text-center transition hover:border-indigo-300 hover:bg-indigo-50/40">
                    <Upload className="h-5 w-5 text-slate-400" />
                    <span className="text-xs text-slate-500">
                      Drag &amp; drop images here or
                      <br />
                      <span className="font-semibold text-indigo-600 underline underline-offset-2">Browse Files</span>
                    </span>
                    <span className="text-[11px] text-slate-400">JPG, PNG up to 5MB each</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      multiple
                      className="hidden"
                      disabled={form.images.length >= 5}
                      onChange={(e) => {
                        handleFiles(e.target.files);
                        e.target.value = "";
                      }}
                    />
                  </label>

                  {form.images.map((img, i) => (
                    <div key={img.url} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200">
                      <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}

                  {form.images.length < 5 && (
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 transition hover:border-indigo-300 hover:text-indigo-500">
                      <Plus className="h-5 w-5" />
                      <span className="text-[11px] font-medium">Add More</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          handleFiles(e.target.files);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  )}
                </div>
              </SectionCard>

         <SectionCard icon={MapPinned} title="Surface & Capacity">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Surface Type" required>
                    <Select value={form.surfaceType} onChange={(e) => update("surfaceType", e.target.value)}>
                      <option value="">Select surface type</option>
                      {SURFACE_TYPES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Surface Behavior">
                    <Select value={form.surfaceBehavior} onChange={(e) => update("surfaceBehavior", e.target.value)}>
                      <option value="">Select surface behavior</option>
                      {SURFACE_BEHAVIORS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Capacity (Spectators)" required>
                    <TextInput
                      icon={User}
                      type="number"
                      min="0"
                      placeholder="Enter capacity"
                      value={form.capacity}
                      onChange={(e) => update("capacity", e.target.value)}
                      error={errors.capacity}
                    />
                  </Field>
                  <Field label="Flood Lights">
                    <div className="flex items-center gap-2 pt-1">
                      <RadioPill name="floodLights" value="yes" current={form.floodLights} onChange={(v) => update("floodLights", v)} label="Yes" />
                      <RadioPill name="floodLights" value="no" current={form.floodLights} onChange={(v) => update("floodLights", v)} label="No" />
                    </div>
                  </Field>
                  <Field label="Indoor / Outdoor">
                    <div className="flex items-center gap-2 pt-1">
                      <RadioPill name="io" value="outdoor" current={form.indoorOutdoor} onChange={(v) => update("indoorOutdoor", v)} label="Outdoor" />
                      <RadioPill name="io" value="indoor" current={form.indoorOutdoor} onChange={(v) => update("indoorOutdoor", v)} label="Indoor" />
                    </div>
                  </Field>
                  <Field label="Pitch Count">
                    <TextInput
                      type="number"
                      min="0"
                      placeholder="Enter number of pitches"
                      value={form.pitchCount}
                      onChange={(e) => update("pitchCount", e.target.value)}
                    />
                  </Field>
                </div>
              </SectionCard>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5 lg:col-span-2">
              

              <SectionCard icon={MapPin} title="Location">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Latitude" required>
                    <TextInput
                      icon={LocateFixed}
                      placeholder="Enter latitude"
                      value={form.latitude}
                      onChange={(e) => update("latitude", e.target.value)}
                      error={errors.latitude}
                    />
                  </Field>
                  <Field label="Longitude" required>
                    <TextInput
                      icon={LocateFixed}
                      placeholder="Enter longitude"
                      value={form.longitude}
                      onChange={(e) => update("longitude", e.target.value)}
                      error={errors.longitude}
                    />
                  </Field>
                  {/* <Field label="Google Map Location" className="sm:col-span-2">
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <TextInput
                        className="flex-1"
                        placeholder="Search location on map"
                        value={form.mapLocation}
                        onChange={(e) => update("mapLocation", e.target.value)}
                      />
                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2.5 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                      >
                        <MapPin className="h-4 w-4" />
                        Pick on Map
                      </button>
                    </div>
                  </Field> */}
                </div>
              </SectionCard>

              <SectionCard icon={Info} title="Additional Information">
                <Field label="Venue Description">
                  <textarea
                    rows={4}
                    placeholder="Enter venue description, facilities, parking, etc."
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                  />
                </Field>
                <div className="mt-4">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Amenities</span>
                  <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                    {AMENITIES.map((amenity) => (
                      <label key={amenity} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                        <input
                          type="checkbox"
                          checked={form.amenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/40"
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>

          {/* Footer actions */}
          {/* <div className="sticky bottom-0 mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/95 py-4 backdrop-blur sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => submit(true)}
              className="rounded-lg border border-indigo-200 bg-white px-5 py-2.5 text-sm font-medium text-indigo-600 shadow-sm transition hover:bg-indigo-50 disabled:opacity-60"
            >
              Save &amp; Add Another
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Save Venue"}
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}