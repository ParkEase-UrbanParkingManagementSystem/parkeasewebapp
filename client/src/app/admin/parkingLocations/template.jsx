import React from 'react';
import AddLocationButton from '../../../ui/admin/location/addlocationbutton/addlocationbutton';
// import LayoutSwitcher from '../_components/layout-switcher';
// import { Separator } from '@/components/ui/separator';

const LocationsTemplate = ({ children }) => {
    return (
        <div>
            <AddLocationButton />
            {/* <Separator className="bg-blue-200 w-full my-4" />
            <LayoutSwitcher /> */}
            {children}
        </div>
    );
};

export default LocationsTemplate;
