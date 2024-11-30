import React from "react";
import { Button } from "../button/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../form/form";
import Input from "../input/input";
import { useMySpotStore } from "../../../../store/index";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
    hourly: z.coerce
        .number({ invalid_type_error: "Must be a number" })
        .positive({ message: "Value must be positive" })
        .finite({ message: "Must be a valid number" }),
});

function Pricing({ onNext, onPrev }) {
    const mySpotStore = useMySpotStore();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            hourly: mySpotStore.data.price?.hourly,
        },
    });

    const onSubmit = (data) => {
        console.log("Submitted data:", data);
        mySpotStore.updateState({
            price: { ...data },
        });
        onNext();
    };

    return (
        <div className="grid w-full gap-1.5">
            <h2 className="text-xl sm:text-2xl py-4 font-semibold">Pricing</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="hourly"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="e.g. 10" />
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

export default Pricing;
