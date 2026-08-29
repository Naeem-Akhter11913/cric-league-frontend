import { Download, Map, Plus, Upload } from "lucide-react";

export const validateVenueForm = (form, amenities, images) => {
    const errors = {};

    if (!form.venueName?.trim()) errors.venueName = "Venue name is required";
    if (!form.city?.trim()) errors.city = "City is required";
    if (!form.surfaceType?.trim()) errors.surfaceType = "Surface type is required";
    if (!form.surfaceBehavior?.trim()) errors.surfaceBehavior = "Surface behavior is required";

    if (!form.capacity?.toString().trim()) {
        errors.capacity = "Capacity is required";
    } else if (isNaN(Number(form.capacity)) || Number(form.capacity) <= 0) {
        errors.capacity = "Capacity must be a positive number";
    }

    if (!form.indoorOutdoor?.trim()) errors.indoorOutdoor = "Indoor / Outdoor is required";

    if (!form.pitchCount?.toString().trim()) {
        errors.pitchCount = "Pitch count is required";
    } else if (isNaN(Number(form.pitchCount)) || Number(form.pitchCount) <= 0) {
        errors.pitchCount = "Pitch count must be a positive number";
    }

    if (!form.addressLine1?.trim()) errors.addressLine1 = "Address line 1 is required";
    if (!form.addressLine2?.trim()) errors.addressLine2 = "Address line 2 is required";
    if (!form.area?.trim()) errors.area = "Area / Locality is required";
    if (!form.state?.trim()) errors.state = "State is required";
    if (!form.country?.trim()) errors.country = "Country is required";

    if (!form.pincode?.trim()) {
        errors.pincode = "Pincode is required";
    } else if (!/^\d{4,10}$/.test(form.pincode.trim())) {
        errors.pincode = "Enter a valid pincode";
    }

    if (!form.contactName?.trim()) errors.contactName = "Contact name is required";

    if (!form.contactNumber?.trim()) {
        errors.contactNumber = "Contact number is required";
    } else if (!/^\+?\d{7,15}$/.test(form.contactNumber.trim())) {
        errors.contactNumber = "Enter a valid contact number";
    }

    if (!form.email?.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        errors.email = "Enter a valid email address";
    }

    if (!form.description?.trim()) errors.description = "Description is required";

    if (!amenities || amenities.length === 0) {
        errors.amenities = "Add at least one amenity";
    }

    if (!images || images.length === 0) {
        errors.images = "Add at least one image";
    }

    return errors;
};

export const generatePayload = (venueForm, amenities, images) => ({
    name: venueForm.venueName,
    city: venueForm.city,
    surface: {
        type: venueForm.surfaceType,
        behavior: venueForm.surfaceBehavior,
    },
    capacity: Number(venueForm.capacity),
    floodLights: venueForm.floodLights,
    indoorOutdoor: venueForm.indoorOutdoor,
    pitchCount: Number(venueForm.pitchCount),
    address: {
        line1: venueForm.addressLine1,
        line2: venueForm.addressLine2,
        area: venueForm.area,
        state: venueForm.state,
        country: venueForm.country,
        pincode: Number(venueForm.pincode),
    },
    contact: {
        name: venueForm.contactName,
        number: Number(venueForm.contactNumber),
        email: venueForm.email,
    },
    description: venueForm.description,
    amenities,
    images,
});

export const EMPTY_VENUE_FORM = {
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
};


// ---- static UI config (not derived from server data) ----
export const QUICK_ACTIONS = [
    { icon: Plus, label: "Add New Venue" },
    { icon: Download, label: "Import Venues" },
    { icon: Upload, label: "Export Venues" },
    { icon: Map, label: "Venue Map View" },
];

export const TOP_CITIES = [
    { city: "Mumbai", count: 8 },
    { city: "Delhi", count: 6 },
    { city: "Bangalore", count: 5 },
    { city: "Kolkata", count: 4 },
    { city: "Hyderabad", count: 3 },
];

// Client-side CSV export — converts an array of venue objects into a CSV
// string and triggers a browser download. No backend call needed since
// the data (VENUES) is already loaded in the table.

export function exportVenuesToCSV(venues, filename = `venues-${Date.now()}.csv`) {
    if (!venues || venues.length === 0) {
        return;
    }

    const columns = [
        { label: "Name", value: (v) => v.name },
        { label: "City", value: (v) => v.city },
        { label: "State", value: (v) => v.state },
        { label: "Surface Type", value: (v) => v.surfaceType },
        { label: "Surface Behavior", value: (v) => v.surface },
        { label: "Capacity", value: (v) => v.capacity },
        { label: "Status", value: (v) => v.status },
        { label: "Flood Lights", value: (v) => v.floodLights },
        { label: "Indoor/Outdoor", value: (v) => v.indoorOutdoor },
        { label: "Pitch Count", value: (v) => v.pitchCount },
    ];

    const escapeCell = (cell) => {
        const str = cell === undefined || cell === null ? "" : String(cell);
        // wrap in quotes and escape any embedded quotes if the value
        // contains a comma, quote, or newline
        if (/[",\n]/.test(str)) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };

    const header = columns.map((c) => escapeCell(c.label)).join(",");
    const rows = venues.map((v) => columns.map((c) => escapeCell(c.value(v))).join(","));
    const csvContent = [header, ...rows].join("\n");

    // prepend a BOM so Excel opens UTF-8 CSVs correctly
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}