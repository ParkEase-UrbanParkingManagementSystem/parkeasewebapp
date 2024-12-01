import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useMySpotStore } from '../../../../store/index';
import { useRouter } from 'next/navigation';
import {Button} from "../button/button";
import { Progress } from '@/components/ui/progress';
import SpotAddress from '../spotaddress/spotaddress';
import NumberOfSpots from '../numberofspots/numberofspots';
import Pricing from '../pricing/pricing';
import Summary from '../summary/summary';
import { toast } from 'sonner';

const totalSteps = 4;
const stepIncrement = 100 / totalSteps;

const AddLocationDialog = ({ id = null, open, setOpen }) => {
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const mySpotStore = useMySpotStore();
    const router = useRouter();

    useEffect(() => {
        setStep(1);

        const fetchData = () => {
            console.log('fetch data');
        };

        if (id && open) {
            fetchData();
        } else {
            mySpotStore.restart();
        }
    }, [id, open]);

    const handleListAnother = () => {
        setStep(1);
        mySpotStore.restart();
    };

    const handleFinalSubmit = async () => {
        setSubmitting(true);

        const data = new FormData();
        console.log(mySpotStore.data);
        data.set('data', JSON.stringify(mySpotStore.data));

        const result = await fetch('/api/parkinglocation/new', {
            method: 'POST',
            body: data,
        });
        setSubmitting(false);

        if (result.ok) {
            toast.success('Record created');
            router.refresh();
        } else {
            toast.error('Failed to create the parking location');
        }
    };

    const handleNextStepChange = () => {
        if (step === totalSteps) return;

        setStep((currentStep) => currentStep + 1);
    };

    const handlePrevStepChange = () => {
        if (step === 1) return;

        setStep((currentStep) => currentStep - 1);
    };

    const handleOnInteractOutside = (e) => {
        const classes = [];

        e.composedPath().forEach((el) => {
            if (el.classList) {
                classes.push(Array.from(el.classList));
            }
        });

        if (classes.join('-').includes('pac-container')) {
            e.preventDefault();
        }
    };


    // const handleListAnother = () => {
    //     setStep(1)
    //     mySpotStore.restart()
    // }

    // const handleFinalSubmit = () => {
    //     //save data in the db
    //     console.log(mySpotStore.data);
    // }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onInteractOutside={handleOnInteractOutside}>
                <DialogHeader>
                    <DialogTitle>List your spot</DialogTitle>
                    <div className="space-y-8">
                        <Progress value={step * stepIncrement} />
                        {{
                            1: <SpotAddress onNext={handleNextStepChange} />,
                            2: (
                                <NumberOfSpots
                                    onNext={handleNextStepChange}
                                    onPrev={handlePrevStepChange}
                                />
                            ),
                            3: (
                                <Pricing
                                    onNext={handleNextStepChange}
                                    onPrev={handlePrevStepChange}
                                />
                            ),
                            4: (
                                <Summary
                                    onNext={handleNextStepChange}
                                    onPrev={handlePrevStepChange}
                                />
                            ),
                        }[step]}
                    </div>
                </DialogHeader>
                <DialogFooter>
                    {/* <div className='flex flex-col mt-4 w-full space-y-2 '> */}
                    <div
                        className={`${step < totalSteps ? 'hidden' : 'flex flex-col mt-4 w-full space-y-2'
                            }`}
                    >
                        <Button type="button" onClick={handleFinalSubmit}>
                            Submit
                        </Button>
                        <Button type="button"
                            variant="outline"
                            onClick={handleListAnother}
                        >
                            List another
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    
    
    
    
    
    
    
    
    
    
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>List Parking Space</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div
                        className={`${step < totalSteps ? 'hidden' : 'flex flex-col mt-4 w-full space-y-2'
                            }`}
                    >
                        <Button type="button" onClick={handleFinalSubmit}>
                            Submit
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleListAnother}
                        >
                            List another
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
};

export default AddLocationDialog;
