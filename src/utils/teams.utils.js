export const getPlayerName = (players, playerId) => {
  const player = players?.find((p) => p._id === playerId);
  return player?.userId?.name || "N/A";
};

export const teamColors = {
  "Royal Warriors": { bg: "#F2B84B", fg: "#7A4B00", label: "RW" },
  "Super Kings": { bg: "#1E3A8A", fg: "#FFFFFF", label: "SK" },
  "Thunder Bolts": { bg: "#2563EB", fg: "#FFFFFF", label: "TB" },
  "Green Warriors": { bg: "#059669", fg: "#FFFFFF", label: "GW" },
  "Blue Tigers": { bg: "#4338CA", fg: "#FFFFFF", label: "BT" },
  "Strikers Club": { bg: "#16A34A", fg: "#FFFFFF", label: "SC" },
};

export const getPlayerAvatar = (players, playerId) => {
  const player = players?.find((p) => p._id === playerId);
  const name = player?.userId?.name;
  return name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=64`
    : "https://ui-avatars.com/api/?name=NA&background=random&size=64";
};