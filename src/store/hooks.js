import { useDispatch, useSelector } from 'react-redux';

// Convenience re-exports so components import from one place.
// (In a TS project these would be typed useAppDispatch/useAppSelector.)
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
