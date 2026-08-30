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
} from "lucide-react";
import Modal from "../model/Modal";
import AddNewVenue from "../components/AddNewVenue";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearVenueError, clearVenueSuccess } from "../store/Slice/venueSlice";
import { venueDelete, venueList, venueTeam, venueUpdate } from "../store/action/venue.action";
import ShowModel from "../model/ShowModel";
import DeleteComponent from "../components/DeleteComponent";
import { EMPTY_VENUE_FORM, exportVenuesToCSV, generatePayload, QUICK_ACTIONS, TOP_CITIES, validateVenueForm } from "../utils/vanue.utils";
import VenueTable from "../components/VenueTable";
import VenueUploadCSV from "../components/VenueUploadCSV";



export default function OrgVenues() {
  const dispatch = useAppDispatch();
  const {
    loading,
    error,
    success,
    list: allVenueInList,
    totalPages,
    venueCount,
  } = useAppSelector((state) => state.venue);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vanueForm, setVanueForm] = useState(EMPTY_VENUE_FORM);
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
  const [limit] = useState(5);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [isModelOpenForUpdate, setisModelOpenForUpdate] = useState(false);
  const [isModelOpenForCSV, setModelOpenForCSV] = useState(false);

  // was missing before: without tracking *which* venue is being edited/
  // deleted, update had no venueId to send and delete had nothing to act on
  const [editingVenueId, setEditingVenueId] = useState(null);
  const [venueToDelete, setVenueToDelete] = useState(null);

  const resetForm = () => {
    setVanueForm(EMPTY_VENUE_FORM);
    setImages([]);
    setAmenities([]);
    setEditingVenueId(null);
  };

  const handleDeleteClick = (item) => {
    setVenueToDelete(item);
    setOpenDeleteModel(true);
  };

  const handleConfirmDelete = () => {
    if (!venueToDelete) return;
    // TODO: wire up your actual delete thunk here, e.g.:
    // dispatch(venueDelete(venueToDelete.id)).then(() => getAllVenue());
    // console.log("deleting venue", venueToDelete.id);
    // return;
    dispatch(venueDelete(venueToDelete.id))
    setOpenDeleteModel(false);
    setVenueToDelete(null);
  };

  const handleEdit = (item) => {
    setVanueForm({
      venueName: item.name,
      city: item.city,
      surfaceType: item.surfaceType,
      surfaceBehavior: item.surface,
      capacity: item.capacity,
      floodLights: item.floodLights,
      indoorOutdoor: item.indoorOutdoor,
      pitchCount: item.pitchCount,
      addressLine1: item.addressObj.line1,
      addressLine2: item.addressObj.line2,
      area: item.addressObj.area,
      state: item.addressObj.state,
      country: item.addressObj.country,
      pincode: item.addressObj.pincode,
      contactName: item.contact.name,
      contactNumber: item.contact.number,
      email: item.contact.email,
      description: item.description,
    });
    setImages(item.images || []);
    setAmenities(item.amenities || []);
    setEditingVenueId(item.id);
    setisModelOpenForUpdate(true);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    const errors = validateVenueForm(vanueForm, amenities, images);
    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]);
      return;
    }
    if (!editingVenueId) {
      toast.error("No venue selected to update");
      return;
    }
    const payload = generatePayload(vanueForm, amenities, images);
    dispatch(venueUpdate({ payload, venueId: editingVenueId }));
  };

  const saveData = () => {
    const errors = validateVenueForm(vanueForm, amenities, images);
    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]);
      return;
    }
    const payload = generatePayload(vanueForm, amenities, images);
    dispatch(venueTeam({ ...payload, images: [""] }));
  };

  const handdleModelClose = () => {
    setIsModalOpen(false);
    setisModelOpenForUpdate(false);
    resetForm();
  };

  const handleAndAddAnother = () => saveData();
  const handleOnSave = () => saveData();

  const getAllVenue = async () => {
    dispatch(venueList());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearVenueError());
      return;
    }

    if (success) {
      toast.success(success);
      getAllVenue();
      dispatch(clearVenueSuccess());
      setIsModalOpen(false);
      setisModelOpenForUpdate(false);
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success]);

  useEffect(() => {
    getAllVenue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // this is the fix for the "undefined fields on edit" bug: floodLights,
  // pitchCount and indoorOutdoor were read in handleEdit but never mapped
  // here, so they were always undefined on the row object
  console.log(allVenueInList)
  const VENUES = useMemo(() => {
    console.log(allVenueInList)
    return (allVenueInList || []).map((item) => ({
      id: item._id,
      name: item.name,
      address: item.address?.line1,
      city: item.city,
      state: item.address.state,
      surface: item.surface.behavior,
      surfaceType: item.surface.type,
      surfaceColor: "bg-orange-100 text-orange-700",
      capacity: item.capacity,
      status: item.status,
      gradient: "from-sky-300 to-sky-500",
      groundOwner: item.createdBy,
      description: item.description,
      contact: item.contact,
      addressObj: item.address,
      amenities: item.amenities,
      images: item.images,
      floodLights: item.floodLights,
      pitchCount: item.pitchCount,
      indoorOutdoor: item.indoorOutdoor,
    }));
  }, [allVenueInList]);



  const statCards = useMemo(() => {
    const total = VENUES.length;
    const active = VENUES.filter((v) => v.status === "Active").length;
    const inactive = total - active;
    const cities = new Set(VENUES.map((v) => v.city).filter(Boolean)).size;

    return [
      { icon: MapPin, label: "Total Venues", value: total, sub: "All registered venues", bg: "bg-violet-50", fg: "text-violet-500" },
      { icon: MapPin, label: "Active Venues", value: active, sub: "Currently active", bg: "bg-emerald-50", fg: "text-emerald-500" },
      { icon: ShieldOff, label: "Inactive Venues", value: inactive, sub: "Temporarily inactive", bg: "bg-amber-50", fg: "text-amber-500" },
      { icon: Building2, label: "Total Cities", value: cities, sub: "Cities with venues", bg: "bg-sky-50", fg: "text-sky-500" },
    ];
  }, [VENUES]);

  const venueSummary = useMemo(() => {
    const total = VENUES.length || 1;
    const active = VENUES.filter((v) => v.status === "Active").length;
    const inactive = VENUES.length - active;
    return [
      { name: "Active", value: active, pct: `${((active / total) * 100).toFixed(1)}%`, color: "#22C55E" },
      { name: "Inactive", value: inactive, pct: `${((inactive / total) * 100).toFixed(1)}%`, color: "#FBBF24" },
    ];
  }, [VENUES]);

  const filteredVenues = useMemo(() => {
    if (!search.trim()) return VENUES;
    const q = search.trim().toLowerCase();
    return VENUES.filter(
      (v) =>
        v.name?.toLowerCase().includes(q) ||
        v.city?.toLowerCase().includes(q) ||
        v.groundOwner?.toLowerCase?.().includes(q)
    );
  }, [VENUES, search]);

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
            {statCards.map((c) => (
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

              <button
                onClick={() => setSearch("")}
                className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50"
              >
                <ListFilter size={14} />
                Clear Filters
              </button>
            </div>
          </div>

          <VenueTable
            currentPage={currentPage}
            filteredVenues={filteredVenues}
            handleEdit={handleEdit}
            venueCount={venueCount}
            limit={limit}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            handleDeleteClick={handleDeleteClick}
          />
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
                      data={venueSummary}
                      dataKey="value"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {venueSummary.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-800">{VENUES.length}</span>
                  <span className="text-[11px] text-slate-400">Total</span>
                </div>
              </div>
              <div className="mt-4 flex w-full flex-col gap-2">
                {venueSummary.map((d) => (
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
                  onClick={
                    a.label === "Add New Venue" ?
                      () => setIsModalOpen(true) : a.label === "Export Venues" ?
                        () => exportVenuesToCSV(filteredVenues) : () => setModelOpenForCSV(true)}
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
      {/* //isModelOpenForCSV, setModelOpenForCSV */}

      <Modal
        open={isModelOpenForCSV}
        onClose={() => setModelOpenForCSV(false)}
        onSave={() =>{console.log("Saving CSV")}}
        loading={loading}isCSV={true}
      >
        <VenueUploadCSV />
      </Modal>

      <Modal
        open={isModalOpen}
        onClose={handdleModelClose}
        onSave={handleOnSave}
        onSaveAndAddAnother={handleAndAddAnother}
        isModelOpenForUpdate={isModelOpenForUpdate}
        handleUpdate={handleUpdate}
        loading={loading}
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
        onClose={() => {
          setOpenDeleteModel(false);
          setVenueToDelete(null);
        }}
        title={"Are you sure you want to delete this venue? This action cannot be undone."}
      >
        <DeleteComponent
          onCancel={() => {
            setOpenDeleteModel(false);
            setVenueToDelete(null);
          }}
          onDelete={handleConfirmDelete}
          loading={loading}
        />
      </ShowModel>
    </div>
  );
}