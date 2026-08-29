import React, { useState } from "react";
import {
  Trophy,
  Info,
  CalendarDays,
  MapPin,
  FileText,
  Star,
  UploadCloud,
  ChevronDown,
  Calendar,
  X,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
} from "lucide-react";

const CreateTournament = () => {
  const [formData, setFormData] = useState({
    name: "",
    format: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    venues: [],
    status: "draft",
    rules: "",
    logo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Tournament Data:", formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px]">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
              <Trophy className="h-7 w-7 text-indigo-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Create Tournament
              </h1>

              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Fill in the details below to create a new tournament.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {/* =========================================
                BASIC INFORMATION
            ========================================= */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<Info className="h-5 w-5" />}
                title="Basic Information"
                description="Provide basic details about the tournament."
              />

              <div className="mt-6">
                {/* Name + Format */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.35fr_1fr]">
                  <FormField label="Tournament Name" required>
                    <div className="relative">
                      <Trophy className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter tournament name"
                        className="input pl-11"
                      />
                    </div>
                  </FormField>

                  <FormField label="Format" required>
                    <div className="relative">
                      <select
                        name="format"
                        value={formData.format}
                        onChange={handleChange}
                        className="input appearance-none pr-10"
                      >
                        <option value="">Select format</option>
                        <option value="T20">T20</option>
                        <option value="ODI">ODI</option>
                        <option value="Test">Test</option>
                        <option value="Custom">Custom</option>
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  </FormField>
                </div>

                {/* Logo + Status */}
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <FormField label="Logo" required>
                    <label
                      htmlFor="logo"
                      className="flex h-[125px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/20 transition hover:border-indigo-400 hover:bg-indigo-50"
                    >
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Tournament logo"
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                      ) : (
                        <>
                          <UploadCloud className="h-8 w-8 text-indigo-500" />

                          <span className="mt-2 text-sm font-medium text-indigo-600">
                            Click to upload logo
                          </span>

                          <span className="mt-1 text-xs text-slate-500">
                            JPG, PNG or SVG (Max. 2MB)
                          </span>
                        </>
                      )}

                      <input
                        id="logo"
                        type="file"
                        accept=".jpg,.jpeg,.png,.svg"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                  </FormField>

                  <FormField label="Status" required>
                    <div>
                      <div className="relative">
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="input appearance-none pr-10"
                        >
                          <option value="draft">Draft</option>
                          <option value="registration_open">
                            Registration Open
                          </option>
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                        </select>

                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        Select current status of the tournament
                      </p>
                    </div>
                  </FormField>
                </div>
              </div>
            </section>

            {/* =========================================
                IMPORTANT DATES
            ========================================= */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<CalendarDays className="h-5 w-5" />}
                title="Important Dates"
                description="Set the key dates for your tournament."
              />

              <div className="mt-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <DateField
                    label="Start Date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />

                  <DateField
                    label="End Date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-6 max-w-[50%]">
                  <DateField
                    label="Registration Deadline"
                    name="registrationDeadline"
                    value={formData.registrationDeadline}
                    onChange={handleChange}
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Last date for team registration
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================
                VENUES
            ========================================= */}
            <section className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<MapPin className="h-5 w-5" />}
                title="Venues"
                description="Select one or more venues where matches will be played."
              />

              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Select Venues <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    multiple
                    value={formData.venues}
                    onChange={(e) => {
                      const values = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );

                      setFormData((prev) => ({
                        ...prev,
                        venues: values,
                      }));
                    }}
                    className="min-h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  >
                    <option value="eden_gardens">Eden Gardens</option>
                    <option value="wankhede">Wankhede Stadium</option>
                    <option value="narendra_modi">
                      Narendra Modi Stadium
                    </option>
                    <option value="m_chinnaswamy">
                      M. Chinnaswamy Stadium
                    </option>
                    <option value="arun_jaitley">
                      Arun Jaitley Stadium
                    </option>
                  </select>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  You can select multiple venues
                </p>
              </div>
            </section>

            {/* =========================================
                RULES
            ========================================= */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<FileText className="h-5 w-5" />}
                title="Rules & Regulations"
                description="Add tournament rules and regulations."
              />

              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Rules <span className="font-normal text-slate-400">(Optional)</span>
                </label>

                {/* Editor */}
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  {/* Toolbar */}
                  <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-white p-2">
                    <EditorButton>
                      <Bold className="h-4 w-4" />
                    </EditorButton>

                    <EditorButton>
                      <Italic className="h-4 w-4" />
                    </EditorButton>

                    <EditorButton>
                      <Underline className="h-4 w-4" />
                    </EditorButton>

                    <div className="mx-1 h-5 w-px bg-slate-200" />

                    <EditorButton>
                      <List className="h-4 w-4" />
                    </EditorButton>

                    <EditorButton>
                      <ListOrdered className="h-4 w-4" />
                    </EditorButton>

                    <div className="mx-1 h-5 w-px bg-slate-200" />

                    <EditorButton>
                      <AlignLeft className="h-4 w-4" />
                    </EditorButton>

                    <EditorButton>
                      <AlignCenter className="h-4 w-4" />
                    </EditorButton>

                    <EditorButton>
                      <AlignRight className="h-4 w-4" />
                    </EditorButton>

                    <div className="mx-1 h-5 w-px bg-slate-200" />

                    <EditorButton>
                      <Link className="h-4 w-4" />
                    </EditorButton>
                  </div>

                  {/* Text Area */}
                  <textarea
                    name="rules"
                    value={formData.rules}
                    onChange={handleChange}
                    maxLength={2000}
                    placeholder="Write tournament rules here..."
                    className="h-28 w-full resize-none border-0 p-4 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />

                  <div className="border-t border-slate-100 px-4 py-2 text-right text-xs text-slate-400">
                    {formData.rules.length}/2000
                  </div>
                </div>
              </div>
            </section>

            {/* =========================================
                STATUS INFORMATION
            ========================================= */}
            <section className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <Star className="h-5 w-5" />
                </div>

                <h2 className="text-lg font-bold text-indigo-700">
                  About Tournament Status
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                <StatusInfo
                  label="draft"
                  text="Tournament is in planning stage and is not visible to teams."
                  type="draft"
                />

                <StatusInfo
                  label="registration_open"
                  text="Teams can register for the tournament."
                  type="registration"
                />

                <StatusInfo
                  label="ongoing"
                  text="Tournament is currently in progress."
                  type="ongoing"
                />

                <StatusInfo
                  label="completed"
                  text="Tournament has been completed."
                  type="completed"
                />
              </div>
            </section>
          </div>

          {/* =========================================
              ACTIONS
          ========================================= */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>

            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              <Trophy className="h-4 w-4" />
              Create Tournament
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =====================================================
   SECTION HEADER
===================================================== */

const SectionHeader = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <div>
        <h2 className="text-lg font-bold text-indigo-600">{title}</h2>

        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
};

/* =====================================================
   FORM FIELD
===================================================== */

const FormField = ({ label, required, children }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}
    </div>
  );
};

/* =====================================================
   DATE FIELD
===================================================== */

const DateField = ({ label, name, value, onChange }) => {
  return (
    <FormField label={label}>
      <div className="relative">
        <input
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          className="input pr-11"
        />

        <Calendar className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
    </FormField>
  );
};

/* =====================================================
   EDITOR BUTTON
===================================================== */

const EditorButton = ({ children }) => {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
    >
      {children}
    </button>
  );
};

/* =====================================================
   STATUS INFO
===================================================== */

const StatusInfo = ({ label, text, type }) => {
  const badgeClasses = {
    draft: "border-slate-200 bg-slate-50 text-slate-600",
    registration:
      "border-emerald-200 bg-emerald-50 text-emerald-600",
    ongoing: "border-blue-200 bg-blue-50 text-blue-600",
    completed:
      "border-purple-200 bg-purple-50 text-purple-600",
  };

  return (
    <div className="grid grid-cols-[145px_1fr] items-center gap-4">
      <span
        className={`w-fit rounded-md border px-2.5 py-1 text-xs font-medium ${badgeClasses[type]}`}
      >
        {label}
      </span>

      <p className="text-sm text-slate-600">{text}</p>
    </div>
  );
};

export default CreateTournament;