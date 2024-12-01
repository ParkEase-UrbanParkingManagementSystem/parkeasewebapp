'use client'

import React, { useState } from 'react';
import {Button} from "../button/button";
import { PlusIcon } from 'lucide-react';
import AddLocationDialog from "../addlocationdialog/addlocationdialog"

const AddLocationButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="flex flex-col">
                <Button className="self-end" onClick={() => setOpen(true)}>
                    <PlusIcon className="mr-2" /> Add Location
                </Button>
                {/* Location add dialog */}
                <AddLocationDialog open={open} setOpen={setOpen} />
            </div>
        </div>
    );
}

export default AddLocationButton; 
