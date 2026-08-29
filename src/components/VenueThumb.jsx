import { Landmark } from "lucide-react";
import React from "react";

function VenueThumb({ gradient }) {
    return (
        <div className={`flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient}`}>
            <Landmark size={20} className="text-white/90" />
        </div>
    );
}

export default VenueThumb;