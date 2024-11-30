import React from "react";
import { Button } from "../button/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../form/form";
import Input from "../input/input";
import { useMySpotStore } from "../../../../store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    numberofspots: z.coerce
        .number({ invalid_type_error: "Must be a number" })
        .positive({ message: "Value must be positive" })
        .finite({ message: "Must be a valid number" }),
});

function NumberOfSpots({ onNext, onPrev }) {
    const mySpotStore = useMySpotStore();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            numberofspots: mySpotStore.data.numberofspots,
        },
    });

    const onSubmit = (data) => {
        console.log("Submitted data:", data);
        mySpotStore.updateState({
            numberofspots: data.numberofspots,
        });
        onNext();
    };

    return (
        <div className="grid w-full gap-1.5">
            <h2 className="text-xl sm:text-2xl py-4 font-semibold">Number of parking spots</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="numberofspots"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="e.g. 3" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between py-4">
                        <Button type="button" variant="ghost" onClick={onPrev}>
                            Prev
                        </Button>
                        <Button type="submit" variant="ghost">
                            Next
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default NumberOfSpots;
