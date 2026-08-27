// import React, { useState, useCallback } from "react";
// import {
//   Building2,
//   Image as ImageIcon,
//   User,
//   MapPin,
//   Info,
//   ArrowLeft,
//   Upload,
//   X,
//   Plus,
//   LocateFixed,
//   Mail,
//   Phone,
//   MapPinned,
// } from "lucide-react";

// const SURFACE_TYPES = ["Turf / Grass", "Matting", "Astroturf", "Cement / Concrete", "Clay"];
// const SURFACE_BEHAVIORS = ["Batting Friendly", "Bowling Friendly", "Balanced", "Spin Friendly", "Pace Friendly"];
// const AMENITIES = ["Parking", "Changing Room", "Water", "Washroom", "Refreshments", "First Aid", "Other"];

// const initialState = {
//   venueName: "",
//   city: "",
//   addressLine1: "",
//   addressLine2: "",
//   state: "",
//   country: "",
//   pincode: "",
//   surfaceType: "",
//   surfaceBehavior: "",
//   capacity: "",
//   floodLights: "yes",
//   indoorOutdoor: "outdoor",
//   pitchCount: "",
//   latitude: "",
//   longitude: "",
//   mapLocation: "",
//   contactName: "",
//   contactNumber: "",
//   email: "",
//   description: "",
//   amenities: [],
//   images: [],
// };

// function Field({ label, required, children, className = "" }) {
//   return (
//     <div className={className}>
//       <label className="mb-1.5 block text-sm font-medium text-slate-700">
//         {label}
//         {required && <span className="ml-0.5 text-rose-500">*</span>}
//       </label>
//       {children}
//     </div>
//   );
// }

// function TextInput({ icon: Icon, error, className = "", ...props }) {
//   return (
//     <div className="relative">
//       <input
//         {...props}
//         className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 ${
//           Icon ? "pr-10" : ""
//         } ${error ? "border-rose-400" : "border-slate-200"} ${className}`}
//       />
//       {Icon && (
//         <Icon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//       )}
//     </div>
//   );
// }

// function Select({ children, className = "", ...props }) {
//   return (
//     <select
//       {...props}
//       className={`w-full appearance-none rounded-lg border border-slate-200 bg-white bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 ${className}`}
//       style={{
//         backgroundImage:
//           "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/></svg>\")",
//       }}
//     >
//       {children}
//     </select>
//   );
// }

// function RadioPill({ name, value, current, onChange, label }) {
//   const active = current === value;
//   return (
//     <button
//       type="button"
//       onClick={() => onChange(value)}
//       className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
//         active
//           ? "border-indigo-500 bg-indigo-50 text-indigo-700"
//           : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
//       }`}
//     >
//       <span
//         className={`flex h-4 w-4 items-center justify-center rounded-full border ${
//           active ? "border-indigo-600" : "border-slate-300"
//         }`}
//       >
//         {active && <span className="h-2 w-2 rounded-full bg-indigo-600" />}
//       </span>
//       {label}
//     </button>
//   );
// }

// function SectionCard({ icon: Icon, title, subtitle, children }) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//       <div className="mb-5 flex items-center gap-3">
//         <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
//           <Icon className="h-5 w-5" />
//         </span>
//         <div>
//           <h3 className="text-sm font-semibold text-slate-800 sm:text-base">{title}</h3>
//           {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
//         </div>
//       </div>
//       {children}
//     </div>
//   );
// }

// export default function AddNewVenue({ onSubmit, onCancel }) {
//   const [form, setForm] = useState(initialState);
//   const [submitting, setSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});

//   const update = useCallback((key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//     setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
//   }, []);

//   const toggleAmenity = (amenity) => {
//     setForm((prev) => ({
//       ...prev,
//       amenities: prev.amenities.includes(amenity)
//         ? prev.amenities.filter((a) => a !== amenity)
//         : [...prev.amenities, amenity],
//     }));
//   };

//   const handleFiles = (fileList) => {
//     const files = Array.from(fileList).slice(0, 5 - form.images.length);
//     const mapped = files.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//       name: file.name,
//     }));
//     setForm((prev) => ({ ...prev, images: [...prev.images, ...mapped].slice(0, 5) }));
//   };

//   const removeImage = (index) => {
//     setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
//   };

//   const validate = () => {
//     const required = ["venueName", "city", "addressLine1", "state", "country", "pincode", "surfaceType", "capacity", "latitude", "longitude"];
//     const next = {};
//     required.forEach((key) => {
//       if (!String(form[key]).trim()) next[key] = true;
//     });
//     setErrors(next);
//     return Object.keys(next).length === 0;
//   };

//   const buildPayload = () => ({
//     venueName: form.venueName.trim(),
//     city: form.city,
//     address: {
//       line1: form.addressLine1.trim(),
//       line2: form.addressLine2.trim() || null,
//       state: form.state,
//       country: form.country,
//       pincode: form.pincode.trim(),
//     },
//     surface: {
//       type: form.surfaceType,
//       behavior: form.surfaceBehavior || null,
//     },
//     capacity: Number(form.capacity) || 0,
//     floodLights: form.floodLights === "yes",
//     indoorOutdoor: form.indoorOutdoor,
//     pitchCount: form.pitchCount ? Number(form.pitchCount) : null,
//     location: {
//       latitude: form.latitude ? Number(form.latitude) : null,
//       longitude: form.longitude ? Number(form.longitude) : null,
//       mapLocation: form.mapLocation.trim() || null,
//     },
//     contact: {
//       name: form.contactName.trim() || null,
//       number: form.contactNumber.trim() || null,
//       email: form.email.trim() || null,
//     },
//     description: form.description.trim() || null,
//     amenities: form.amenities,
//     images: form.images.map((img) => img.file),
//   });

//   const submit = async (addAnother) => {
//     // if (!validate()) return;
//     const payload = buildPayload();
//     console.log(payload);
//     return;
//     try {
//       setSubmitting(true);
//       if (onSubmit) {
//         await onSubmit(payload);
//       } else {
//         // eslint-disable-next-line no-console
//         console.log("Venue payload ready for dispatch:", payload);
//       }
//       if (addAnother) {
//         setForm(initialState);
//         setErrors({});
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 px-2 py-2 sm:px-2 lg:px-2">
//       <div className="mx-auto max-w-6xl">
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             submit(false);
//           }}
//         >
//           <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
//             {/* Left column */}
//             <div className="flex flex-col gap-5 lg:col-span-3">
//               <SectionCard icon={Building2} title="Basic Information">
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <Field label="Venue Name" required>
//                     <TextInput
//                       placeholder="Enter venue name"
//                       value={form.venueName}
//                       onChange={(e) => update("venueName", e.target.value)}
//                       error={errors.venueName}
//                     />
//                   </Field>
//                   <Field label="City" required>
//                     <Select value={form.city} onChange={(e) => update("city", e.target.value)}>
//                       <option value="">Select city</option>
//                       <option>Faridabad</option>
//                       <option>Delhi</option>
//                       <option>Mumbai</option>
//                       <option>Bengaluru</option>
//                       <option>Chennai</option>
//                     </Select>
//                   </Field>
//                   <Field label="Address Line 1" required className="sm:col-span-2">
//                     <TextInput
//                       placeholder="Enter address line 1"
//                       value={form.addressLine1}
//                       onChange={(e) => update("addressLine1", e.target.value)}
//                       error={errors.addressLine1}
//                     />
//                   </Field>
//                   <Field label="Address Line 2" className="sm:col-span-2">
//                     <TextInput
//                       placeholder="Enter address line 2 (optional)"
//                       value={form.addressLine2}
//                       onChange={(e) => update("addressLine2", e.target.value)}
//                     />
//                   </Field>
//                   <Field label="State / Province" required>
//                     <Select value={form.state} onChange={(e) => update("state", e.target.value)}>
//                       <option value="">Select state</option>
//                       <option>Haryana</option>
//                       <option>Delhi</option>
//                       <option>Maharashtra</option>
//                       <option>Karnataka</option>
//                       <option>Tamil Nadu</option>
//                     </Select>
//                   </Field>
//                   <Field label="Country" required>
//                     <Select value={form.country} onChange={(e) => update("country", e.target.value)}>
//                       <option value="">Select country</option>
//                       <option>India</option>
//                       <option>Australia</option>
//                       <option>England</option>
//                       <option>South Africa</option>
//                     </Select>
//                   </Field>
//                   <Field label="Pincode / Zip Code" required>
//                     <TextInput
//                       placeholder="Enter pincode"
//                       value={form.pincode}
//                       onChange={(e) => update("pincode", e.target.value)}
//                       error={errors.pincode}
//                     />
//                   </Field>
//                 </div>
//               </SectionCard>

//               <SectionCard icon={ImageIcon} title="Venue Images">
//                 <p className="-mt-3 mb-4 text-xs text-slate-400">Upload images of the venue (Max 5 images)</p>
//                 <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//                   <label className="col-span-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-3 py-6 text-center transition hover:border-indigo-300 hover:bg-indigo-50/40">
//                     <Upload className="h-5 w-5 text-slate-400" />
//                     <span className="text-xs text-slate-500">
//                       Drag &amp; drop images here or
//                       <br />
//                       <span className="font-semibold text-indigo-600 underline underline-offset-2">Browse Files</span>
//                     </span>
//                     <span className="text-[11px] text-slate-400">JPG, PNG up to 5MB each</span>
//                     <input
//                       type="file"
//                       accept="image/jpeg,image/png"
//                       multiple
//                       className="hidden"
//                       disabled={form.images.length >= 5}
//                       onChange={(e) => {
//                         handleFiles(e.target.files);
//                         e.target.value = "";
//                       }}
//                     />
//                   </label>

//                   {form.images.map((img, i) => (
//                     <div key={img.url} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200">
//                       <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(i)}
//                         className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
//                       >
//                         <X className="h-3.5 w-3.5" />
//                       </button>
//                     </div>
//                   ))}

//                   {form.images.length < 5 && (
//                     <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 transition hover:border-indigo-300 hover:text-indigo-500">
//                       <Plus className="h-5 w-5" />
//                       <span className="text-[11px] font-medium">Add More</span>
//                       <input
//                         type="file"
//                         accept="image/jpeg,image/png"
//                         multiple
//                         className="hidden"
//                         onChange={(e) => {
//                           handleFiles(e.target.files);
//                           e.target.value = "";
//                         }}
//                       />
//                     </label>
//                   )}
//                 </div>
//               </SectionCard>

//          <SectionCard icon={MapPinned} title="Surface & Capacity">
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <Field label="Surface Type" required>
//                     <Select value={form.surfaceType} onChange={(e) => update("surfaceType", e.target.value)}>
//                       <option value="">Select surface type</option>
//                       {SURFACE_TYPES.map((s) => (
//                         <option key={s}>{s}</option>
//                       ))}
//                     </Select>
//                   </Field>
//                   <Field label="Surface Behavior">
//                     <Select value={form.surfaceBehavior} onChange={(e) => update("surfaceBehavior", e.target.value)}>
//                       <option value="">Select surface behavior</option>
//                       {SURFACE_BEHAVIORS.map((s) => (
//                         <option key={s}>{s}</option>
//                       ))}
//                     </Select>
//                   </Field>
//                   <Field label="Capacity (Spectators)" required>
//                     <TextInput
//                       icon={User}
//                       type="number"
//                       min="0"
//                       placeholder="Enter capacity"
//                       value={form.capacity}
//                       onChange={(e) => update("capacity", e.target.value)}
//                       error={errors.capacity}
//                     />
//                   </Field>
//                   <Field label="Flood Lights">
//                     <div className="flex items-center gap-2 pt-1">
//                       <RadioPill name="floodLights" value="yes" current={form.floodLights} onChange={(v) => update("floodLights", v)} label="Yes" />
//                       <RadioPill name="floodLights" value="no" current={form.floodLights} onChange={(v) => update("floodLights", v)} label="No" />
//                     </div>
//                   </Field>
//                   <Field label="Indoor / Outdoor">
//                     <div className="flex items-center gap-2 pt-1">
//                       <RadioPill name="io" value="outdoor" current={form.indoorOutdoor} onChange={(v) => update("indoorOutdoor", v)} label="Outdoor" />
//                       <RadioPill name="io" value="indoor" current={form.indoorOutdoor} onChange={(v) => update("indoorOutdoor", v)} label="Indoor" />
//                     </div>
//                   </Field>
//                   <Field label="Pitch Count">
//                     <TextInput
//                       type="number"
//                       min="0"
//                       placeholder="Enter number of pitches"
//                       value={form.pitchCount}
//                       onChange={(e) => update("pitchCount", e.target.value)}
//                     />
//                   </Field>
//                 </div>
//               </SectionCard>
//             </div>

//             {/* Right column */}
//             <div className="flex flex-col gap-5 lg:col-span-2">


//               <SectionCard icon={MapPin} title="Location">
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <Field label="Latitude" required>
//                     <TextInput
//                       icon={LocateFixed}
//                       placeholder="Enter latitude"
//                       value={form.latitude}
//                       onChange={(e) => update("latitude", e.target.value)}
//                       error={errors.latitude}
//                     />
//                   </Field>
//                   <Field label="Longitude" required>
//                     <TextInput
//                       icon={LocateFixed}
//                       placeholder="Enter longitude"
//                       value={form.longitude}
//                       onChange={(e) => update("longitude", e.target.value)}
//                       error={errors.longitude}
//                     />
//                   </Field>
//                   {/* <Field label="Google Map Location" className="sm:col-span-2">
//                     <div className="flex flex-col gap-2 sm:flex-row">
//                       <TextInput
//                         className="flex-1"
//                         placeholder="Search location on map"
//                         value={form.mapLocation}
//                         onChange={(e) => update("mapLocation", e.target.value)}
//                       />
//                       <button
//                         type="button"
//                         className="flex items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2.5 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
//                       >
//                         <MapPin className="h-4 w-4" />
//                         Pick on Map
//                       </button>
//                     </div>
//                   </Field> */}
//                 </div>
//               </SectionCard>

//               <SectionCard icon={Info} title="Additional Information">
//                 <Field label="Venue Description">
//                   <textarea
//                     rows={4}
//                     placeholder="Enter venue description, facilities, parking, etc."
//                     value={form.description}
//                     onChange={(e) => update("description", e.target.value)}
//                     className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
//                   />
//                 </Field>
//                 <div className="mt-4">
//                   <span className="mb-2 block text-sm font-medium text-slate-700">Amenities</span>
//                   <div className="flex flex-wrap gap-x-5 gap-y-2.5">
//                     {AMENITIES.map((amenity) => (
//                       <label key={amenity} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
//                         <input
//                           type="checkbox"
//                           checked={form.amenities.includes(amenity)}
//                           onChange={() => toggleAmenity(amenity)}
//                           className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/40"
//                         />
//                         {amenity}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </SectionCard>
//             </div>
//           </div>

//           {/* Footer actions */}
//           {/* <div className="sticky bottom-0 mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/95 py-4 backdrop-blur sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               disabled={submitting}
//               onClick={() => submit(true)}
//               className="rounded-lg border border-indigo-200 bg-white px-5 py-2.5 text-sm font-medium text-indigo-600 shadow-sm transition hover:bg-indigo-50 disabled:opacity-60"
//             >
//               Save &amp; Add Another
//             </button>
//             <button
//               type="submit"
//               disabled={submitting}
//               className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-60"
//             >
//               {submitting ? "Saving…" : "Save Venue"}
//             </button>
//           </div> */}
//         </form>
//       </div>
//     </div>
//   );
// }


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