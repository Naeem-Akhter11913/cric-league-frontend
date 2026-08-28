import React, { useState, useRef } from "react";
import {
  Building2,
  Layers,
  MapPin,
  Phone,
  ClipboardList,
  Image as ImageIcon,
  ChevronDown,
  X,
  Plus,
  UploadCloud,
} from "lucide-react";

const SectionCard = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7">
    <div className="flex items-center gap-2.5 mb-6">
      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600">
        <Icon className="w-4.5 h-4.5" strokeWidth={2} />
      </span>
      <h2 className="text-[15px] font-semibold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
);

const Label = ({ children }) => (
  <label className="block text-sm font-medium text-gray-800 mb-1.5">
    {children}
    <span className="text-red-500 ml-0.5">*</span>
  </label>
);

const inputClass =
  "w-full px-3.5 py-2.5 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const TextField = ({ placeholder, value, onChange, ...props }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={inputClass}
    {...props}
  />
);

const SelectField = ({ placeholder, value, onChange, options = [], required }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      required={required}
      className={`${inputClass} appearance-none pr-9 ${value ? "text-gray-700" : "text-gray-400"
        }`}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="text-gray-700">
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>
);

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${checked ? "bg-emerald-500" : "bg-gray-300"
      }`}
  >
    <span
      className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-1"
        }`}
    />
  </button>
);

export default function AddNewVenue({form, setForm,amenityInput, setAmenityInput,images, setImages,amenities, setAmenities}) {

  const fileInputRef = useRef(null);

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const addAmenity = (e) => {
    if (e.key === "Enter" && amenityInput.trim()) {
      e.preventDefault();
      if (!amenities.includes(amenityInput.trim())) {
        setAmenities((prev) => [...prev, amenityInput.trim()]);
      }
      setAmenityInput("");
    }
  };

  const removeAmenity = (item) =>
    setAmenities((prev) => prev.filter((a) => a !== item));

  const handleFiles = (files) => {
    const remaining = 10 - images.length;
    const list = Array.from(files).slice(0, remaining);
    const readers = list.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((urls) =>
      setImages((prev) => [...prev, ...urls])
    );
  };

  const removeImage = (idx) =>
    setImages((prev) => prev.filter((_, i) => i !== idx));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Basic Information */}
        <SectionCard icon={Building2} title="Basic Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>Venue Name</Label>
              <TextField
                placeholder="Enter venue name"
                value={form.venueName}
                onChange={update("venueName")}
                required
              />
            </div>
            <div>
              <Label>City</Label>
              <TextField
                placeholder="Enter city"
                value={form.city}
                onChange={update("city")}
                required
              />
            </div>
          </div>
        </SectionCard>

        {/* Surface Details */}
        <SectionCard icon={Layers} title="Surface Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>Surface Type</Label>
              <SelectField
                placeholder="Select surface type"
                value={form.surfaceType}
                onChange={update("surfaceType")}
                options={["Turf", "Matting", "Cement", "Astroturf"]}
                required
              />
            </div>
            <div>
              <Label>Surface Behavior</Label>
              <TextField
                placeholder="e.g. Batting friendly, Bowling friendly, Balanced, etc."
                value={form.surfaceBehavior}
                onChange={update("surfaceBehavior")}
                required
              />
            </div>
          </div>
        </SectionCard>

        {/* Venue Specifications */}
        <SectionCard icon={MapPin} title="Venue Specifications">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <Label>Capacity (Spectators)</Label>
              <TextField
                placeholder="Enter capacity"
                value={form.capacity}
                onChange={update("capacity")}
                required
              />
            </div>
            <div>
              <Label>Flood Lights</Label>
              <div className="flex items-center gap-3 h-[42px]">
                <Toggle
                  checked={form.floodLights}
                  onChange={(val) =>
                    setForm((prev) => ({ ...prev, floodLights: val }))
                  }
                />
                <span className="text-sm text-gray-600">
                  {form.floodLights ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
            <div>
              <Label>Indoor / Outdoor</Label>
              <SelectField
                placeholder="Select type"
                value={form.indoorOutdoor}
                onChange={update("indoorOutdoor")}
                options={["indoor", "outdoor"]}
                required
              />
            </div>
            <div>
              <Label>Pitch Count</Label>
              <TextField
                placeholder="Enter pitch count"
                value={form.pitchCount}
                onChange={update("pitchCount")}
                required
              />
            </div>
          </div>
        </SectionCard>

        {/* Location Details */}
        <SectionCard icon={MapPin} title="Location Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <Label>Address Line 1</Label>
              <TextField
                placeholder="Enter address line 1"
                value={form.addressLine1}
                onChange={update("addressLine1")}
                required
              />
            </div>
            <div>
              <Label>Address Line 2</Label>
              <TextField
                placeholder="Enter address line 2"
                value={form.addressLine2}
                onChange={update("addressLine2")}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            <div>
              <Label>Area / Locality</Label>
              <TextField
                placeholder="Enter area or locality"
                value={form.area}
                onChange={update("area")}
                required
              />
            </div>
            <div>
              <Label>State / Province</Label>
              <SelectField
                placeholder="Select state"
                value={form.state}
                onChange={update("state")}
                options={["Delhi", "Maharashtra", "Karnataka", "Punjab"]}
                required
              />
            </div>
            <div>
              <Label>Country</Label>
              <SelectField
                placeholder="Select country"
                value={form.country}
                onChange={update("country")}
                options={["India", "Australia", "England", "USA"]}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <Label>Pincode / ZIP Code</Label>
              <TextField
                placeholder="Enter pincode or zip code"
                value={form.pincode}
                onChange={update("pincode")}
                required
              />
            </div>
          </div>
        </SectionCard>

        {/* Contact Information */}
        <SectionCard icon={Phone} title="Contact Information">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <Label>Contact Name</Label>
              <TextField
                placeholder="Enter contact name"
                value={form.contactName}
                onChange={update("contactName")}
                required
              />
            </div>
            <div>
              <Label>Contact Number</Label>
              <TextField
                placeholder="Enter contact number"
                value={form.contactNumber}
                onChange={update("contactNumber")}
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <TextField
                placeholder="Enter email address"
                value={form.email}
                onChange={update("email")}
                required
              />
            </div>
          </div>
        </SectionCard>

        {/* Description & Amenities */}
        <SectionCard icon={ClipboardList} title="Description & Amenities">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>Description</Label>
              <div className="relative">
                <textarea
                  placeholder="Enter description about the venue..."
                  value={form.description}
                  onChange={update("description")}
                  maxLength={500}
                  rows={5}
                  required
                  className={`${inputClass} resize-none pb-6`}
                />
                <span className="absolute bottom-2 right-3 text-[11px] text-gray-400">
                  {form.description.length} / 500
                </span>
              </div>
            </div>
            <div>
              <Label>Amenities</Label>
              <input
                type="text"
                placeholder="Add amenities and press Enter"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={addAmenity}
                className={inputClass}
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {amenities.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeAmenity(item)}
                      className="text-emerald-700/70 hover:text-emerald-900"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 px-2 py-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add More
                </button>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Images */}
        <SectionCard icon={ImageIcon} title="Images">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              multiple
              hidden
              onChange={(e) => handleFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-gray-200 rounded-xl h-32 text-gray-400 hover:border-emerald-400 hover:text-emerald-500 transition"
            >
              <Plus className="w-5 h-5" />
              <span className="text-xs font-medium">Add More</span>
            </button>

            {images.map((src, idx) => (
              <div
                key={idx}
                className="relative h-32 rounded-xl overflow-hidden border border-gray-200 group"
              >
                <img
                  src={src}
                  alt={`Venue ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white text-red-500 flex items-center justify-center shadow"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
              </div>
            ))}


          </div>
          <p className="text-xs text-gray-400 mt-3">
            You can upload up to 10 images
          </p>
        </SectionCard>
      </div>
    </div>
  );
}