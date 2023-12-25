import { useReducer } from 'react';

// Custom hook for toggle dropdown
function useToggleDropdown(initialState: boolean) {
    const [isOpen, dispatch] = useReducer(toggleDropdownReducer, initialState);

    function toggleDropdownReducer(state: boolean, action: { type: string }) {
        switch (action.type) {
            case 'TOGGLE_DROPDOWN':
                return !state;
            default:
                return state;
        }
    }

    function handleToggleDropdown() {
        dispatch({ type: 'TOGGLE_DROPDOWN' });
    }

    return [isOpen, handleToggleDropdown] as const;
}

export default useToggleDropdown;
