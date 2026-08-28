import React, { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  MapPin,
  ShieldOff,
  Building2,
  Plus,
  Search,
  ChevronDown,
  ListFilter,
  Pencil,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users,
  Download,
  Upload,
  Map,
  Landmark,
  X,
} from "lucide-react";
import Modal from "../model/Modal";
import AddNewVenue from "../components/AddNewVenue";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearTeamError, clearTeamSuccess } from "../store/Slice/teamSlice";
import { clearVenueError, clearVenueSuccess } from "../store/Slice/venueSlice";
import { venueList, venueTeam } from "../store/action/venue.action";
import ShowModel from "../model/ShowModel";
import DeleteComponent from "../components/DeleteComponent";


const STAT_CARDS = [
  { icon: MapPin, label: "Total Venues", value: "42", sub: "All registered venues", bg: "bg-violet-50", fg: "text-violet-500" },
  { icon: MapPin, label: "Active Venues", value: "38", sub: "Currently active", bg: "bg-emerald-50", fg: "text-emerald-500" },
  { icon: ShieldOff, label: "Inactive Venues", value: "4", sub: "Temporarily inactive", bg: "bg-amber-50", fg: "text-amber-500" },
  { icon: Building2, label: "Total Cities", value: "12", sub: "Cities with venues", bg: "bg-sky-50", fg: "text-sky-500" },
];

// const VENUES = [
//   {
//     name: "Green Valley Cricket Ground",
//     address: "Sector 21, Near Sports Complex",
//     city: "Delhi",
//     state: "Delhi",
//     surface: "Grass",
//     surfaceType: "Natural",
//     surfaceColor: "bg-emerald-100 text-emerald-700",
//     capacity: "5,000",
//     status: "Active",
//     gradient: "from-emerald-300 to-emerald-500",
//   },
//   {
//     name: "City Cricket Stadium",
//     address: "MG Road, Near Metro Station",
//     city: "Mumbai",
//     state: "Maharashtra",
//     surface: "Turf",
//     surfaceType: "Synthetic",
//     surfaceColor: "bg-orange-100 text-orange-700",
//     capacity: "10,000",
//     status: "Active",
//     gradient: "from-sky-300 to-sky-500",
//   },
//   {
//     name: "Riverside Sports Arena",
//     address: "River View Road, Near Bridge",
//     city: "Kolkata",
//     state: "West Bengal",
//     surface: "Grass",
//     surfaceType: "Natural",
//     surfaceColor: "bg-emerald-100 text-emerald-700",
//     capacity: "3,500",
//     status: "Active",
//     gradient: "from-teal-300 to-teal-500",
//   },
//   {
//     name: "Sunshine Cricket Ground",
//     address: "Park Avenue, Central Park",
//     city: "Bangalore",
//     state: "Karnataka",
//     surface: "Turf",
//     surfaceType: "Synthetic",
//     surfaceColor: "bg-orange-100 text-orange-700",
//     capacity: "7,000",
//     status: "Inactive",
//     gradient: "from-slate-300 to-slate-400",
//   },
//   {
//     name: "Royal Cricket Ground",
//     address: "Old Airport Road, Near Terminal",
//     city: "Hyderabad",
//     state: "Telangana",
//     surface: "Grass",
//     surfaceType: "Natural",
//     surfaceColor: "bg-emerald-100 text-emerald-700",
//     capacity: "8,000",
//     status: "Active",
//     gradient: "from-lime-300 to-lime-500",
//   },
// ];

const VENUE_SUMMARY = [
  { name: "Active", value: 38, pct: "90.5%", color: "#22C55E" },
  { name: "Inactive", value: 4, pct: "9.5%", color: "#FBBF24" },
];

const QUICK_ACTIONS = [
  { icon: Plus, label: "Add New Venue" },
  { icon: Download, label: "Import Venues" },
  { icon: Upload, label: "Export Venues" },
  { icon: Map, label: "Venue Map View" },
];

const TOP_CITIES = [
  { city: "Mumbai", count: 8 },
  { city: "Delhi", count: 6 },
  { city: "Bangalore", count: 5 },
  { city: "Kolkata", count: 4 },
  { city: "Hyderabad", count: 3 },
];

const BEHAVIOR = [
  "batting_friendly",
  "bowling_friendly",
  "spin_friendly",
  "pace_friendly",
  "balanced",
  "slow",
  "fast"
]


function StatusPill({ status }) {
  const active = status === "Active";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${active ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
        }`}
    >
      {status}
    </span>
  );
}

function VenueThumb({ gradient }) {
  return (
    <div className={`flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient}`}>
      <Landmark size={20} className="text-white/90" />
    </div>
  );
}

const validateVenueForm = (form, amenities, images) => {
  const errors = {};

  if (!form.venueName?.trim()) return errors.venueName = "Venue name is required";
  if (!form.city?.trim()) return errors.city = "City is required";
  if (!form.surfaceType?.trim()) return errors.surfaceType = "Surface type is required";
  if (!form.surfaceBehavior?.trim()) return errors.surfaceBehavior = "Surface behavior is required";

  if (!form.capacity?.toString().trim()) {
    return errors.capacity = "Capacity is required";
  } else if (isNaN(Number(form.capacity)) || Number(form.capacity) <= 0) {
    return errors.capacity = "Capacity must be a positive number";
  }

  if (!form.indoorOutdoor?.trim()) return errors.indoorOutdoor = "Indoor / Outdoor is required";

  if (!form.pitchCount?.toString().trim()) {
    return errors.pitchCount = "Pitch count is required";
  } else if (isNaN(Number(form.pitchCount)) || Number(form.pitchCount) <= 0) {
    return errors.pitchCount = "Pitch count must be a positive number";
  }

  if (!form.addressLine1?.trim()) return errors.addressLine1 = "Address line 1 is required";
  if (!form.addressLine2?.trim()) return errors.addressLine2 = "Address line 2 is required";
  if (!form.area?.trim()) return errors.area = "Area / Locality is required";
  if (!form.state?.trim()) return errors.state = "State is required";
  if (!form.country?.trim()) return errors.country = "Country is required";

  if (!form.pincode?.trim()) {
    return errors.pincode = "Pincode is required";
  } else if (!/^\d{4,10}$/.test(form.pincode.trim())) {
    return errors.pincode = "Enter a valid pincode";
  }

  if (!form.contactName?.trim()) return errors.contactName = "Contact name is required";

  if (!form.contactNumber?.trim()) {
    return errors.contactNumber = "Contact number is required";
  } else if (!/^\+?\d{7,15}$/.test(form.contactNumber.trim())) {
    return errors.contactNumber = "Enter a valid contact number";
  }

  if (!form.email?.trim()) {
    return errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    return errors.email = "Enter a valid email address";
  }

  if (!form.description?.trim()) return errors.description = "Description is required";

  if (!amenities || amenities.length === 0) {
    return errors.amenities = "Add at least one amenity";
  }

  if (!images || images.length === 0) {
    return errors.images = "Add at least one image";
  }

  return errors;
};
export default function OrgVenues() {
  const dispatch = useAppDispatch();
  const { loading, error, success, list: allVenueInList, totalPages, venueCount } = useAppSelector(state => state.venue)

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vanueForm, setVanueForm] = useState({
    venueName: "",
    city: "",
    surfaceType: "",
    surfaceBehavior: "",
    capacity: "",
    floodLights: true,
    indoorOutdoor: "",
    pitchCount: "",
    addressLine1: "",
    addressLine2: "",
    area: "",
    state: "",
    country: "",
    pincode: "",
    contactName: "",
    contactNumber: "",
    email: "",
    description: "",
  });
  const [amenities, setAmenities] = useState([
    "Parking",
    "Changing Room",
    "Drinking Water",
    "Washroom",
    "Cafeteria",
  ]);
  const [amenityInput, setAmenityInput] = useState("");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [openDeleteModel, setOpenDeleteModel] = useState(false)
  const [openOwnerModel, setOpenOwnerModel] = useState(false);
  const [isModelOpenForUpdate, setisModelOpenForUpdate] = useState(false)


  const handleDelete = (item) => {
    console.log(item)
    setOpenDeleteModel(true)
  }
  const handleView = (item) => { console.log(item) }

  const handleEdit = (item) => {
    console.log(item.name)
    setVanueForm({
      venueName: item.name,
      city: item.city,
      surfaceType: item.surface.type,
      surfaceBehavior: item.surface.behavior,
      capacity: item.capacity,
      floodLights: item.floodLights,
      indoorOutdoor: item.indoorOutdoor,
      pitchCount: item.pitchCount,
      addressLine1: item.address.line1,
      addressLine2: item.address.line2,
      area: item.address.area,
      state: item.address.state,
      country: item.address.country,
      pincode: item.address.pincode,
      contactName: item.contact.name,
      contactNumber: item.contact.number,
      email: item.contact.email,
      description: item.description,
    });
    setImages(item.images || []);
    setAmenities(item.amenities || []);
    setisModelOpenForUpdate(true)
    setIsModalOpen(true)
  }


  const saveData = () => {
    const errors = validateVenueForm(vanueForm, amenities, images);

    if (Object.keys(errors).length > 0) {
      toast.error(errors);
      return;
    }

    const payload = {
      name: vanueForm.venueName,
      city: vanueForm.city,
      surface: {
        type: vanueForm.surfaceType,
        behavior: vanueForm.surfaceBehavior,
      },
      capacity: Number(vanueForm.capacity),
      floodLights: vanueForm.floodLights,
      indoorOutdoor: vanueForm.indoorOutdoor,
      pitchCount: Number(vanueForm.pitchCount),
      address: {
        line1: vanueForm.addressLine1,
        line2: vanueForm.addressLine2,
        area: vanueForm.area,
        state: vanueForm.state,
        country: vanueForm.country,
        pincode: vanueForm.pincode,
      },
      contact: {
        name: vanueForm.contactName,
        number: vanueForm.contactNumber,
        email: vanueForm.email,
      },
      description: vanueForm.description,
      amenities,
      images: ["jkdfhs", "dkjfh"],
    };
    dispatch(venueTeam(payload));
  };

  const handleAndAddAnother = () => { saveData() }
  const handleOnSave = () => { saveData() }

  const getAllVenue = async () => {
    dispatch(venueList())
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearVenueError();
      return
    }

    if (success) {
      toast.success(success);
      getAllVenue()
      clearVenueSuccess();
      setIsModalOpen(false);
      setVanueForm({
        venueName: "Naeem Akhter",
        city: "Purnia",
        surfaceType: "",
        surfaceBehavior: "",
        capacity: "",
        floodLights: true,
        indoorOutdoor: "",
        pitchCount: "",
        addressLine1: "",
        addressLine2: "",
        area: "",
        state: "",
        country: "",
        pincode: "",
        contactName: "",
        contactNumber: "",
        email: "",
        description: "",
      })
      return;
    }
  }, [error, success]);

  useEffect(() => {
    getAllVenue()
  }, []);


  const VENUES = useMemo(() => {
    return allVenueInList.map(item => {
      return {
        name: item.name,
        address: item.address.line1,
        city: item.city,
        state: item.address.state,
        surface: item.surface.behavior,
        surfaceType: item.surface.type,
        surfaceColor: "bg-orange-100 text-orange-700",
        capacity: item.capacity,
        status: item.status,
        gradient: "from-sky-300 to-sky-500",
        id: item._id,
        groundOwner: item.createdBy,
        description:item.description,
        contact:item.contact
      }
    })
  }, [allVenueInList])

  return (
    <div className="h-screen bg-[#F7F7F9] overflow-y-auto no-scrollbar p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Venues</h1>
          <p className="mt-1 text-sm text-slate-500">Manage all cricket venues</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 self-start rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 lg:self-auto"
        >
          <Plus size={16} />
          Add New Venue
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_300px]">
        {/* Left column */}
        <div className="min-w-0">
          {/* Stat cards */}
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STAT_CARDS.map((c) => (
              <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}>
                  <c.icon size={18} className={c.fg} />
                </div>
                <p className="text-xs text-slate-400">{c.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{c.value}</p>
                <p className="text-xs text-slate-400">{c.sub}</p>
              </div>
            ))}
          </div>

          {/* Filter bar */}
          <div className="mb-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px] flex-1">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search venues by name, city or ground..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-300"
                />
              </div>

              <div>
                <p className="mb-1 text-xs text-slate-400">Status</p>
                <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50">
                  All
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
              </div>
              <div>
                <p className="mb-1 text-xs text-slate-400">City</p>
                <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50">
                  All
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
              </div>
              <div>
                <p className="mb-1 text-xs text-slate-400">Surface Type</p>
                <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50">
                  All
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
              </div>

              <button className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50">
                <ListFilter size={14} />
                Clear Filters
              </button>
            </div>
          </div>

          {/* Venues table */}
          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-400">
                    <th className="px-5 py-3 font-medium">Venue</th>
                    <th className="px-5 py-3 font-medium">City</th>
                    <th className="px-5 py-3 font-medium">Surface Type</th>
                    <th className="px-5 py-3 font-medium">Capacity</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {VENUES.map((v) => (
                    <tr key={v.name} className="text-slate-700 hover:bg-slate-50/60">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <VenueThumb gradient={v.gradient} />
                          <div>
                            <p className="font-semibold text-slate-800">{v.name}</p>
                            <p className="flex items-center gap-1 text-xs text-slate-400">
                              <MapPin size={11} className="text-orange-400" />
                              {v.address}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-700">{v.city}</p>
                        <p className="text-xs text-slate-400">{v.state}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${v.surfaceColor}`}>
                          {v.surface}
                        </span>
                        <p className="mt-1 text-xs text-slate-400">{v.surfaceType}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Users size={13} className="text-slate-400" />
                          {v.capacity}
                        </div>
                        <p className="text-xs text-slate-400">Spectators</p>
                      </td>
                      <td className="px-5 py-4">
                        <StatusPill status={v.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEdit(v)} className="rounded-lg border border-indigo-100 p-1.5 text-indigo-500 hover:bg-indigo-50">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => handleView(v)} className="rounded-lg border border-sky-100 p-1.5 text-sky-500 hover:bg-sky-50">
                            <Eye size={14} />
                          </button>
                          <button onClick={() => handleDelete(v)} className="rounded-lg border border-rose-100 p-1.5 text-rose-500 hover:bg-rose-50">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

              <span className="text-sm text-slate-500">
                Showing{" "}
                {venueCount === 0 ? 0 : (currentPage - 1) * limit + 1}
                {" "}to{" "}
                {Math.min(currentPage * limit, venueCount)}
                {" "}of {venueCount} venues
              </span>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">

                  {/* Previous */}
                  <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Pages */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`h-8 w-8 rounded-lg text-sm font-medium ${p === currentPage
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                      {p}
                    </button>
                  ))}

                  {/* Next */}
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Venue summary */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-[15px] font-semibold text-slate-800">Venue Summary</h3>
            <div className="flex flex-col items-center">
              <div className="relative h-[150px] w-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={VENUE_SUMMARY}
                      dataKey="value"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {VENUE_SUMMARY.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-800">42</span>
                  <span className="text-[11px] text-slate-400">Total</span>
                </div>
              </div>
              <div className="mt-4 flex w-full flex-col gap-2">
                {VENUE_SUMMARY.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.name}
                    </div>
                    <span className="font-medium text-slate-700">
                      {d.value} <span className="text-slate-400">({d.pct})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-[15px] font-semibold text-slate-800">Quick Actions</h3>
            <div className="flex flex-col gap-1">
              {QUICK_ACTIONS.map((a) => (
                <button
                  key={a.label}
                  onClick={a.label === "Add New Venue" ? () => setIsModalOpen(true) : undefined}
                  className="flex items-center gap-2.5 rounded-xl px-2 py-2.5 text-left text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  <a.icon size={16} />
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Top cities */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-[15px] font-semibold text-slate-800">Top Cities</h3>
            <div className="flex flex-col gap-3">
              {TOP_CITIES.map((c) => (
                <div key={c.city} className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">{c.city}</span>
                  <span className="text-slate-400">{c.count} venues</span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-xl border border-indigo-200 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
              View All Cities
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          isModelOpenForUpdate(false)
        }}
        onSave={handleOnSave}
        onSaveAndAddAnother={handleAndAddAnother}
        isModelOpenForUpdate={isModelOpenForUpdate}
      >
        <AddNewVenue
          form={vanueForm}
          setForm={setVanueForm}
          amenities={amenities}
          setAmenities={setAmenities}
          amenityInput={amenityInput}
          setAmenityInput={setAmenityInput}
          images={images}
          setImages={setImages}
        />
      </Modal>

      <ShowModel
        open={openDeleteModel}
        onClose={() => setOpenDeleteModel(false)}
        title={"Are you sure you want to delete this venue? This action cannot be undone."}
      >
        <DeleteComponent
          onCancel={() => setOpenDeleteModel(false)}
          onDelete={handleDelete}
        />
      </ShowModel>
    </div>
  );
}