"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  cn,
  generateTimeOptions,
  localeMap,
} from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EditReservationForm } from "@/components/common/edit-reservation-form";
import { useReservationFormState } from "@/hooks/useReservationFormState";

import { useBoundStore } from "@/stores/store";

import dayjs from "dayjs";
import { useEffect } from "react";
import {useRouter} from "next/navigation";

const FormSchema = z.object({
  plocation: z.string({
    required_error: "Please select pickup location!",
  }),
  vtype: z.string({
    required_error: "Please select type!",
  }),
  dlocation: z.string().optional(),
  pickupdate: z.date({
    required_error: "Please select pickup date!",
  }),
  dropoffdate: z.date({
    required_error: "Please select pickup date!",
  }),
  ptimehours: z.string({
    required_error: "Please select pickup time!",
  }),
  dtimehours: z.string({
    required_error: "Please select pickup time!",
  }),
});

export default function ReservationForm() {
  const router = useRouter();
  const locale = "en"
  const timeOptions = generateTimeOptions();
  const currentLocale = "em";
  const dateFnsLocale = localeMap[currentLocale] || localeMap["en"];
  const setPickupLocation = useBoundStore((state) => state.setPickupLocation);
  const pickupLocation = useBoundStore((state) => state.pickupLocation);
  const setDropOffLocation = useBoundStore((state) => state.setDropOffLocation);
  const dropoffLocation = useBoundStore((state) => state.dropoffLocation);
  const setVehicleType = useBoundStore((state) => state.setVehicleType);
  const setPickupDate = useBoundStore((state) => state.setPickupDate);
  const pickupDate = useBoundStore((state) => state.pickupDate);
  const setPickupTime = useBoundStore((state) => state.setPickupTime);
  const pickupTime = useBoundStore((state) => state.pickupTime);
  const setDropOffDate = useBoundStore((state) => state.setDropOffDate);
  const dropoffDate = useBoundStore((state) => state.dropoffDate);
  const setDropOffTime = useBoundStore((state) => state.setDropOffTime);
  const dropoffTime = useBoundStore((state) => state.dropoffTime);
  const setSelectedDays = useBoundStore((state) => state.setSelectedDays);
  const isHydrated = useBoundStore?.persist?.hasHydrated();
  const {
    isPCalendarOpen,
    isDCalendarOpen,
    isDLocationOpen,
    isPtimeOpen,
    isDtimeOpen,
    isNewLocation,
    togglePCalendarOpen,
    toggleDCalendarOpen,
    toggleDLocationOpen,
    togglePtimeOpen,
    toggleDtimeOpen,
    toggleNewLocation,
  } = useReservationFormState();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      plocation: pickupLocation || "Zagreb",
      dlocation: dropoffLocation || "",
      vtype: "1",
      pickupdate:
        isHydrated && pickupDate ? dayjs(pickupDate).toDate() : new Date(),
      dropoffdate:
        isHydrated && dropoffDate ? dayjs(dropoffDate).toDate() : new Date(),
      ptimehours: pickupTime || "12:00",
      dtimehours: dropoffTime || "12:00",
    },
  });
  useEffect(() => {
    if (isHydrated) {
      form.reset({
        plocation: pickupLocation || "Zagreb",
        dlocation: dropoffLocation || "",
        vtype: "1",
        pickupdate: pickupDate ? dayjs(pickupDate).toDate() : new Date(),
        dropoffdate: dropoffDate ? dayjs(dropoffDate).toDate() : new Date(),
        ptimehours: pickupTime || "12:00",
        dtimehours: dropoffTime || "12:00",
      });
    }
  }, [
    isHydrated,
    pickupLocation,
    dropoffLocation,
    pickupDate,
    dropoffDate,
    pickupTime,
    dropoffTime,
    form,
  ]);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const start = dayjs(data.pickupdate);
    const end = dayjs(data.dropoffdate);
    const days = end.diff(start, "day") + 1;
    setPickupLocation(data.plocation);
    setDropOffLocation((isNewLocation && data.dlocation) || "");
    setVehicleType(data.vtype);
    setPickupDate(data.pickupdate);
    setPickupTime(data.ptimehours);
    setDropOffDate(data.dropoffdate);
    setDropOffTime(data.dtimehours);
    setSelectedDays(days);

    router.push("/reservation/vehicles", { scroll: false });
  }

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full rounded-lg bg-white px-4 py-4 shadow-md lg:px-8 lg:pb-4 lg:pt-6"
      >
        <div className="flex flex-wrap items-end gap-4 xl:flex-nowrap">
          <div className="flex w-full flex-col gap-4 md:flex-row xl:w-1/2">
            <FormField
              control={form.control}
              name="plocation"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold">
                    Pickup location
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (isNewLocation) {
                        toggleDLocationOpen();
                      } else {
                        togglePCalendarOpen();
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-[50px]">
                        <div className="flex gap-2">
                          <Image
                            src="/icons/ico_location.svg"
                            alt="location"
                            width={14}
                            height={14}
                            className="filter-primary"
                          />
                          <SelectValue placeholder="Pickup location" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Zagreb">Zagreb</SelectItem>
                      <SelectItem value="Split">Split</SelectItem>
                      <SelectItem value="Zadar">Zadar</SelectItem>
                      <SelectItem value="Pula">Pula</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            {isNewLocation && (
              <FormField
                control={form.control}
                name="dlocation"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold">
                      Dropoff Location
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        toggleDLocationOpen();
                        togglePCalendarOpen();
                      }}
                      defaultValue={field.value}
                      open={isDLocationOpen}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="h-[50px]"
                          onClick={toggleDLocationOpen}
                        >
                          <div className="flex gap-2">
                            <Image
                              src="/icons/ico_location.svg"
                              alt="location"
                              width={14}
                              height={14}
                              className="filter-primary"
                            />
                            <SelectValue placeholder="Dropoff location" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent onPointerDownOutside={toggleDLocationOpen}>
                        <SelectItem value="Zagreb">Zagreb</SelectItem>
                        <SelectItem value="Split">Split</SelectItem>
                        <SelectItem value="Zadar">Zadar</SelectItem>
                        <SelectItem value="Pula">Pula</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="vtype"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold">Vehicle type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      togglePCalendarOpen();
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-[50px]">
                        <div className="flex gap-2">
                          <Image
                            src={
                              field.value === "1"
                                ? "/icons/ico_car_dropdown.svg"
                                : field.value === "2"
                                  ? "/icons/ico_scooter.svg"
                                  : "/icons/ico_offroad.svg"
                            }
                            alt="location"
                            width={20}
                            height={20}
                            className="filter-primary"
                          />
                          <SelectValue placeholder="Vehicle type" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Cars</SelectItem>
                      <SelectItem value="2">Scooters</SelectItem>
                      <SelectItem value="3">Offroad</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full items-end xl:w-1/4">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="pickupdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Pickup date</FormLabel>
                    <Popover open={isPCalendarOpen}>
                      <PopoverTrigger asChild onClick={togglePCalendarOpen}>
                        <FormControl>
                          <Button
                              variant={"outline"}
                              className={cn(
                                  "h-[50px] w-full justify-start rounded-br-none rounded-tr-none text-left text-sm font-normal hover:bg-transparent hover:text-black",
                                  !field.value && "text-muted-foreground",
                              )}
                          >
                            <Image
                                src="/icons/ico_calendar.svg"
                                alt="calendar"
                                width={15}
                                height={15}
                                className="mr-2 h-4 w-4"
                            />
                            <span>Pick a date</span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                        onPointerDownOutside={togglePCalendarOpen}
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(e:any) => {
                            if (e) {
                              field.onChange(e);
                              togglePCalendarOpen();
                              togglePtimeOpen();
                              form.setValue("dropoffdate", e);
                              console.log("e", e);
                            }
                          }}
                          disabled={(date:any) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          locale={dateFnsLocale}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="ptimehours"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        togglePtimeOpen();
                        toggleDCalendarOpen();
                      }}
                      defaultValue={field.value}
                      open={isPtimeOpen}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="h-[50px] rounded-bl-none rounded-tl-none"
                          onClick={togglePtimeOpen}
                        >
                          <div className="flex gap-2">
                            <Image
                              src="/icons/ico_clock.svg"
                              alt="location"
                              width={16}
                              height={16}
                              className="filter-primary"
                            />
                            <SelectValue placeholder="Pickup location" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent onPointerDownOutside={togglePtimeOpen}>
                        {timeOptions.map((time) => (
                          <SelectItem
                            key={time}
                            value={time}
                            onClick={() => togglePtimeOpen()}
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full items-end xl:w-1/4">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="dropoffdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Dropoff date
                    </FormLabel>
                    <Popover open={isDCalendarOpen}>
                      <PopoverTrigger asChild onClick={toggleDCalendarOpen}>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-[50px] w-full justify-start rounded-br-none rounded-tr-none text-left text-sm font-normal hover:bg-transparent hover:text-black",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <Image
                              src="/icons/ico_calendar.svg"
                              alt="calendar"
                              width={15}
                              height={15}
                              className="mr-2 h-4 w-4"
                            />

                              <span>Pick a date</span>

                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                        onPointerDownOutside={toggleDCalendarOpen}
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(e:any) => {
                            field.onChange(e);
                            toggleDCalendarOpen();
                            toggleDtimeOpen();
                          }}
                          disabled={(date:any) =>
                            date < form.getValues("pickupdate")
                          }
                          locale={dateFnsLocale}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="dtimehours"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        console.log(value);
                        toggleDtimeOpen();
                        field.onChange(value);
                      }}
                      open={isDtimeOpen}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="h-[50px] rounded-bl-none rounded-tl-none"
                          onClick={toggleDtimeOpen}
                        >
                          <div className="flex gap-2">
                            <Image
                              src="/icons/ico_clock.svg"
                              alt="location"
                              width={16}
                              height={16}
                              className="filter-primary"
                            />
                            <SelectValue placeholder="Pickup location" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent onPointerDownOutside={toggleDtimeOpen}>
                        {timeOptions.map((time) => (
                          <SelectItem
                            key={time}
                            value={time}
                            onClick={() => toggleDtimeOpen()}
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="min-w-full xl:w-auto xl:min-w-[125px]">
            <Button
              type="submit"
              className="h-[50px] w-full font-semibold"
              disabled={form.formState.isSubmitting}
            >
             SEND
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between sm:flex-row sm:items-end">
          <div className="mt-3 flex cursor-pointer items-center space-x-2">
            <Switch
              id="new-location-mode"
              checked={isNewLocation}
              onCheckedChange={toggleNewLocation}
            />
            <Label htmlFor="new-location-mode" className="cursor-pointer py-3">
              Different dropoff location
            </Label>
          </div>
          <div className="ml-auto sm:ml-2">
            <EditReservationForm />
          </div>
        </div>
      </form>
    </Form>
  );
}
