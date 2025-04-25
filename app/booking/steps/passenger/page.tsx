"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

// Dummy journey data
const journeyData = {
  id: "1",
  company: "Cloudy Transit",
  logo: "CT",
  from: {
    city: "Lagos",
    terminal: "Jibowu Terminal, Lagos",
    time: "23:15",
  },
  to: {
    city: "Abuja",
    terminal: "Utako Terminal, Abuja",
    time: "07:25",
  },
  duration: "8h 10m",
  journeyNumber: "CT-6018",
  class: "Economy",
  date: "May 16, 2025",
  luggage: "2 x 23 kg",
  handLuggage: "1 x 7 kg",
  bus: {
    type: "Luxury Coach",
    seating: "3-2 seat layout",
    features: "29 inches Seat pitch (standard)",
  },
  stops: [
    {
      city: "Ibadan",
      terminal: "Challenge Terminal, Ibadan",
      arrivalTime: "01:25",
      departureTime: "01:45",
      duration: "20 min",
    },
  ],
  price: 14850,
  adultBasicFee: 15000,
  tax: "Included",
  regularTotalPrice: 15000,
  save: 150,
  totalPrice: 14850,
}

const passengerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  surname: z.string().min(2, { message: "Surname must be at least 2 characters" }),
  title: z.string().min(1, { message: "Please select a title" }),
  birthday: z.date({ required_error: "Please select a date of birth" }),
  nationality: z.string().min(1, { message: "Please select a nationality" }),
  idNumber: z.string().min(6, { message: "ID number must be at least 6 characters" }),
  countryOfIssue: z.string().min(1, { message: "Please select country of issue" }),
  idExpiryDate: z.date({ required_error: "Please select an expiry date" }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters" }),
  contactSurname: z.string().min(2, { message: "Contact surname must be at least 2 characters" }),
  contactTitle: z.string().min(1, { message: "Please select a title" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
})

type PassengerFormValues = z.infer<typeof passengerSchema>

export default function PassengerDetailsPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(new Date())

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PassengerFormValues>({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      name: "",
      surname: "",
      title: "",
      nationality: "",
      idNumber: "",
      countryOfIssue: "",
      contactName: "",
      contactSurname: "",
      contactTitle: "",
      email: "",
      phone: "",
    },
  })

  const onSubmit = (data: PassengerFormValues) => {
    console.log("Passenger data:", data)
    router.push("/booking/steps/payment")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">My booking</h1>
            <div className="relative flex items-center justify-between max-w-md mb-6">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-muted"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  1
                </div>
                <span className="text-sm mt-1 text-primary">Booking</span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  2
                </div>
                <span className="text-sm mt-1 text-muted-foreground">Purchase</span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  3
                </div>
                <span className="text-sm mt-1 text-muted-foreground">Get your E-ticket</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <h2 className="text-lg font-medium">Passenger details</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Name as on ID card/passport without title and punctuation
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Input text" {...register("name")} />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="surname">Surname</Label>
                        <Input id="surname" placeholder="Input text" {...register("surname")} />
                        {errors.surname && <p className="text-sm text-destructive">{errors.surname.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Select onValueChange={(value) => setValue("title", value)} defaultValue="">
                          <SelectTrigger id="title">
                            <SelectValue placeholder="Input text" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mr">Mr</SelectItem>
                            <SelectItem value="mrs">Mrs</SelectItem>
                            <SelectItem value="miss">Miss</SelectItem>
                            <SelectItem value="ms">Ms</SelectItem>
                            <SelectItem value="dr">Dr</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthday">Birthday</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Input text</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(date) => {
                                setDate(date)
                                setValue("birthday", date as Date)
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.birthday && <p className="text-sm text-destructive">{errors.birthday.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nationality">Nationality</Label>
                        <Select onValueChange={(value) => setValue("nationality", value)} defaultValue="">
                          <SelectTrigger id="nationality">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nigeria">Nigeria</SelectItem>
                            <SelectItem value="ghana">Ghana</SelectItem>
                            <SelectItem value="cameroon">Cameroon</SelectItem>
                            <SelectItem value="benin">Benin</SelectItem>
                            <SelectItem value="togo">Togo</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.nationality && <p className="text-sm text-destructive">{errors.nationality.message}</p>}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                      <h2 className="text-lg font-medium">Identity</h2>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mb-4">
                      <p className="text-sm mb-2">
                        ID card valid for at least 6 months from departure date is required for interstate travel
                      </p>
                      <p className="text-sm">
                        Make sure that the passenger's name is exactly as written in the government issued
                        ID/Passport/Driving License. Avoid any mistake, because some operators don't allow name
                        corrections after booking.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="idNumber">ID/Passport number</Label>
                      <Input id="idNumber" placeholder="Input text" {...register("idNumber")} />
                      {errors.idNumber && <p className="text-sm text-destructive">{errors.idNumber.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="countryOfIssue">Country of Issue</Label>
                        <Select onValueChange={(value) => setValue("countryOfIssue", value)} defaultValue="">
                          <SelectTrigger id="countryOfIssue">
                            <SelectValue placeholder="Input text" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nigeria">Nigeria</SelectItem>
                            <SelectItem value="ghana">Ghana</SelectItem>
                            <SelectItem value="cameroon">Cameroon</SelectItem>
                            <SelectItem value="benin">Benin</SelectItem>
                            <SelectItem value="togo">Togo</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.countryOfIssue && (
                          <p className="text-sm text-destructive">{errors.countryOfIssue.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="idExpiryDate">ID/Passport Expiry Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !expiryDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {expiryDate ? format(expiryDate, "PPP") : <span>Select</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={expiryDate}
                              onSelect={(date) => {
                                setExpiryDate(date)
                                setValue("idExpiryDate", date as Date)
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.idExpiryDate && (
                          <p className="text-sm text-destructive">{errors.idExpiryDate.message}</p>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <h2 className="text-lg font-medium">Contact details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Name</Label>
                        <Input id="contactName" placeholder="Input text" {...register("contactName")} />
                        {errors.contactName && <p className="text-sm text-destructive">{errors.contactName.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactSurname">Surname</Label>
                        <Input id="contactSurname" placeholder="Input text" {...register("contactSurname")} />
                        {errors.contactSurname && (
                          <p className="text-sm text-destructive">{errors.contactSurname.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactTitle">Title</Label>
                        <Select onValueChange={(value) => setValue("contactTitle", value)} defaultValue="">
                          <SelectTrigger id="contactTitle">
                            <SelectValue placeholder="Input text" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mr">Mr</SelectItem>
                            <SelectItem value="mrs">Mrs</SelectItem>
                            <SelectItem value="miss">Miss</SelectItem>
                            <SelectItem value="ms">Ms</SelectItem>
                            <SelectItem value="dr">Dr</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.contactTitle && (
                          <p className="text-sm text-destructive">{errors.contactTitle.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Input text" {...register("email")} />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input id="phone" placeholder="Input text" {...register("phone")} />
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-primary">Price details</h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Adult basic fee</span>
                      <span>₦{journeyData.adultBasicFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>{journeyData.tax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Regular total price</span>
                      <span>₦{journeyData.regularTotalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-primary">
                      <span>Save</span>
                      <span>-₦{journeyData.save.toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-lg text-primary">₦{journeyData.totalPrice.toLocaleString()}</span>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="font-medium">Houston - Los Angeles</h3>

                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">{journeyData.logo}</span>
                        </div>
                        <span className="text-sm font-medium">Cloudy Transit</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">HOU - LAS</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 8v4l3 3" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        <span>Economy</span>
                      </div>

                      <div className="flex justify-between text-sm mb-1">
                        <span>23:15 - 1:25</span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 8v4l3 3" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                          <span>2h10m</span>
                        </span>
                      </div>

                      <div className="flex justify-between text-xs">
                        <span className="text-primary">Refundable</span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" x2="19" y1="12" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                          <span>Direct</span>
                        </span>
                      </div>
                      <div className="text-xs text-primary">Reschedule Available</div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">{journeyData.logo}</span>
                        </div>
                        <span className="text-sm font-medium">Cloudy Transit</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">LAS - LAX</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 8v4l3 3" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        <span>Economy</span>
                      </div>

                      <div className="flex justify-between text-sm mb-1">
                        <span>2:25 - 7:40</span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 8v4l3 3" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                          <span>5h15m</span>
                        </span>
                      </div>

                      <div className="flex justify-between text-xs">
                        <span className="text-primary">Refundable</span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" x2="19" y1="12" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                          <span>Direct</span>
                        </span>
                      </div>
                      <div className="text-xs text-primary">Reschedule Available</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
