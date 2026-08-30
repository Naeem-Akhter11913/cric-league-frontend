
import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import {
  Trophy,
  Info,
  Calendar,
  MapPin,
  FileText,
  UploadCloud,
  ChevronDown,
  X,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignRight,
  IndentIncrease,
  Link2,
  TrophyIcon,
  IndianRupee,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Static data                                                               */
/* -------------------------------------------------------------------------- */

const FORMAT_OPTIONS = [
  'T20', 'T15', 'T10', 'SORT-BOUNDARY'
];
const FORMAT_TYPE = [
  "Knockout",
  "Round Robin",
  "League + Playoffs",
  "Double Elimination",
]

const STATUS_OPTIONS = [
  { lavel: "Draft", value: "draft" },
  { lavel: "Registration Open", value: "registration_open" },
  { lavel: "Ongoing", value: "ongoing" },
  { lavel: "Upcoming", value: "upcoming" },
  { lavel: "Completed", value: 'completed' }
];

const VENUE_OPTIONS = [
  "City Cricket Ground",
  "Riverside Stadium",
  "Greenfield Sports Complex",
  "Downtown Turf Arena",
  "Sunrise Cricket Academy",
];

/* -------------------------------------------------------------------------- */
/*  Shared layout primitives                                                  */
/* -------------------------------------------------------------------------- */

function SectionCard({ icon: Icon, title, description, children }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
          <Icon size={20} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-indigo-600">{title}</h2>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({ label, required, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Venue multi-select                                                        */
/* -------------------------------------------------------------------------- */

function VenueMultiSelect({ options, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleVenue = (venue) => {
    onChange(
      selected.includes(venue)
        ? selected.filter((v) => v !== venue)
        : [...selected, venue]
    );
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-left text-sm text-slate-400 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-100"
      >
        {selected.length === 0 ? (
          <span>Select venues</span>
        ) : (
          <div className="flex flex-wrap gap-1.5 py-0.5">
            {selected.map((v) => (
              <span
                key={v}
                className="flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600"
              >
                {options.find(item => item.id === v)?.name || ""}
                <X
                  size={12}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVenue(v);
                  }}
                />
              </span>
            ))}
          </div>
        )}
        <ChevronDown
          size={18}
          className={`ml-2 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-10 mt-1.5 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          {options.map((venue) => (
            <label
              key={venue.id}
              className="flex cursor-pointer items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={selected.includes(venue.id)}
                onChange={() => toggleVenue(venue.id)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
              />
              {venue.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Rules & Regulations rich text editor (Tiptap)                             */
/* -------------------------------------------------------------------------- */

function ToolbarButton({ onClick, active, disabled, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      className={[
        "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-40",
        active
          ? "bg-indigo-50 text-indigo-600"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="mx-1 h-5 w-px shrink-0 bg-slate-200" />;
}

function RulesEditor({ value, onChange, placeholder = "Write tournament rules here..." }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Underline,
      TextAlign.configure({ types: ["paragraph", "listItem"] }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[140px] px-4 py-3 text-sm text-slate-700 focus:outline-none [&_p]:my-1",
      },
    },
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  // Keep editor content in sync if `value` changes from outside (e.g. reset).
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter a URL", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50/60 px-2 py-1.5">
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={16} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Align left"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Align right"
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Indent"
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
          disabled={!editor.can().sinkListItem("listItem")}
        >
          <IndentIncrease size={16} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton label="Add link" active={editor.isActive("link")} onClick={setLink}>
          <Link2 size={16} />
        </ToolbarButton>
      </div>

      {/* Editable area */}
      <div className="relative">
        {editor.isEmpty && (
          <span className="pointer-events-none absolute left-4 top-3 text-sm text-slate-400">
            {placeholder}
          </span>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function CreateTournament({ allVenueInList, setLogo, form, setForm }) {
  const fileInputRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleLogoFile = (file) => {
    if (!file) return;
    setLogo(file);
    setLogoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const removeLogo = (e) => {
    e.stopPropagation();
    setLogo(null);
    setLogoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Clean up the object URL when the component unmounts.
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <Trophy size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Create Tournament</h1>
            <p className="text-sm text-slate-500">
              Fill in the details below to create a new tournament
            </p>
          </div>
        </div>

        <form className="flex flex-col gap-6">
          {/* Top row: Basic Information + Important Dates */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SectionCard
              icon={Info}
              title="Basic Information"
              description="Provide basic details about the tournament."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Tournament Name" required>
                  <div className="relative">
                    <Trophy
                      size={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Enter tournament name"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </Field>

                <Field label="Format" required>
                  <div className="relative">
                    <select
                      value={form.format}
                      onChange={update("format")}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="" disabled>
                        Select format
                      </option>
                      {FORMAT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </Field>
                <Field label="Format Type" required>
                  <div className="relative">
                    <select
                      value={form.formatType}
                      onChange={update("formatType")}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="" disabled>
                        Select format Type
                      </option>
                      {FORMAT_TYPE.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </Field>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Logo" required>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      handleLogoFile(e.dataTransfer.files?.[0]);
                    }}
                    className={`relative flex h-full min-h-[132px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors ${dragOver
                      ? "border-indigo-400 bg-indigo-50/70"
                      : "border-indigo-200 bg-indigo-50/40 hover:bg-indigo-50/70"
                      }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.svg"
                      className="hidden"
                      onChange={(e) => handleLogoFile(e.target.files?.[0])}
                    />

                    {logoPreview ? (
                      <>
                        <button
                          type="button"
                          onClick={removeLogo}
                          aria-label="Remove logo"
                          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-white shadow-sm transition-colors hover:bg-rose-600"
                        >
                          <X size={13} />
                        </button>
                        <img
                          src={logoPreview}
                          alt="Tournament logo preview"
                          className="h-[100%] w-[100%] rounded-lg border border-slate-200 bg-white object-contain p-1 shadow-sm"
                        />
                      </>
                    ) : (
                      <>
                        <UploadCloud size={26} className="text-indigo-400" />
                        <p className="text-sm font-medium text-indigo-600">Click to upload logo</p>
                        <p className="text-xs text-slate-400">JPG, PNG or SVG (Max. 2MB)</p>
                      </>
                    )}
                  </div>
                </Field>

                <Field label="Status" required>
                  <div className=" h-[140px] flex flex-wrap gap-1 rounded-[20px] border border-slate-200 bg-white p-1 shadow-sm">
                    {STATUS_OPTIONS.map((status) => {
                      const active = form.status === status.value;
                      return (
                        <button
                          key={status.value}
                          type="button"
                          onClick={() => {
                            setForm((f) => ({ ...f, status:status.value }))
                          }}
                          className={` min-w-[100px] w-[115px] flex items-center gap-1.5 whitespace-nowrap rounded-[30px] px-3 py-1 text-xs font-medium transition-colors ${active
                            ? "bg-indigo-100 text-indigo-700"
                            : "text-slate-500 hover:bg-slate-50"
                            }`}
                        >
                          {active && <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />}
                          {status.lavel}
                        </button>
                      );
                    })}
                  </div>
                </Field>
              </div>
            </SectionCard>

            <SectionCard
              icon={Calendar}
              title="Important Dates"
              description="Set the key dates for your tournament."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Start Date">
                  <div className="relative">
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={update("startDate")}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 [color-scheme:light]"
                    />
                    <Calendar
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400"
                    />
                  </div>
                </Field>

                <Field label="End Date">
                  <div className="relative">
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={update("endDate")}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 [color-scheme:light]"
                    />
                    <Calendar
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400"
                    />
                  </div>
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Registration Deadline" hint="Last date for team registration">
                  <div className="relative">
                    <input
                      type="date"
                      value={form.registrationDeadline}
                      onChange={update("registrationDeadline")}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 [color-scheme:light]"
                    />
                    <Calendar
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400"
                    />
                  </div>
                </Field>
              </div>
            </SectionCard>
          </div>

          {/* Venues */}
          <SectionCard
            icon={MapPin}
            title="Venues"
            description="Select one or more venues where matches will be played."
          >
            <Field label="Select Venues" required hint="You can select multiple venues">
              <VenueMultiSelect
                options={allVenueInList}
                selected={form.venues}
                onChange={(venues) => setForm((f) => ({ ...f, venues }))}
              />
            </Field>
          </SectionCard>

          {/* Pricing */}
          <SectionCard
            icon={TrophyIcon}
            title="Prize Pool"
            description="Set the prize amounts for the tournament winner and runner-up."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Winner Price" required>
                <div className="relative">
                  <IndianRupee
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="number"
                    value={form.winnerPrice}
                    onChange={update("winnerPrice")}
                    placeholder="Enter Winner Price"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </Field>
              <Field label="Runner Price" required>
                <div className="relative">
                  <IndianRupee
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="number"
                    value={form.runnerPrice}
                    onChange={update("runnerPrice")}
                    placeholder="Enter Runner Price"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </Field>
            </div>
          </SectionCard>

          {/* Rules & Regulations */}
          <SectionCard
            icon={FileText}
            title="Rules & Regulations"
            description="Add tournament rules and regulations"
          >
            <Field label="Rules (Optional)">
              <RulesEditor
                value={form.rules}
                onChange={(html) => setForm((f) => ({ ...f, rules: html }))}
              />
            </Field>
          </SectionCard>
        </form>
      </div>
    </div>
  );
}