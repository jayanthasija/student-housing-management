"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
  roomType: z.enum(["single", "double", "triple", "quad"], {
    required_error: "Please select a room type.",
  }),
  buildingPreference: z.array(z.string()).optional(),
  roommates: z.array(z.string()).optional(),
  dietaryRestrictions: z.array(z.string()).optional(),
  studyHabits: z.enum(["morning", "afternoon", "evening", "night"], {
    required_error: "Please select your study habits.",
  }),
  sleepTime: z.enum(["before10", "10to12", "after12"], {
    required_error: "Please select your typical sleep time.",
  }),
  noiseLevel: z.number().min(0).max(100),
  cleanlinessLevel: z.number().min(0).max(100),
  smokingFriendly: z.boolean().default(false),
  petFriendly: z.boolean().default(false),
  additionalNotes: z.string().optional(),
})

const buildings = [
  { id: "smith", label: "Smith Hall" },
  { id: "johnson", label: "Johnson Hall" },
  { id: "east", label: "East Residence" },
  { id: "west", label: "West Residence" },
  { id: "north", label: "North Campus Apartments" },
]

const dietaryOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "kosher", label: "Kosher" },
  { id: "halal", label: "Halal" },
  { id: "no-nuts", label: "No Nuts" },
  { id: "no-dairy", label: "No Dairy" },
]

export default function PreferencesForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomType: "double",
      buildingPreference: ["smith", "east"],
      roommates: [],
      dietaryRestrictions: [],
      studyHabits: "evening",
      sleepTime: "10to12",
      noiseLevel: 50,
      cleanlinessLevel: 75,
      smokingFriendly: false,
      petFriendly: true,
      additionalNotes: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Preferences updated",
        description: "Your housing preferences have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="roomType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Room Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="single" />
                    </FormControl>
                    <FormLabel className="font-normal">Single Room (1 person)</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="double" />
                    </FormControl>
                    <FormLabel className="font-normal">Double Room (2 people)</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="triple" />
                    </FormControl>
                    <FormLabel className="font-normal">Triple Room (3 people)</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="quad" />
                    </FormControl>
                    <FormLabel className="font-normal">Quad Room (4 people)</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buildingPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Building Preference</FormLabel>
              <FormDescription>Select the buildings you would prefer to live in.</FormDescription>
              <FormControl>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {buildings.map((building) => (
                    <FormItem key={building.id} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(building.id)}
                          onCheckedChange={(checked) => {
                            const current = field.value || []
                            if (checked) {
                              field.onChange([...current, building.id])
                            } else {
                              field.onChange(current.filter((value) => value !== building.id))
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{building.label}</FormLabel>
                    </FormItem>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dietaryRestrictions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Restrictions</FormLabel>
              <FormDescription>Select any dietary restrictions or preferences.</FormDescription>
              <FormControl>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {dietaryOptions.map((option) => (
                    <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option.id)}
                          onCheckedChange={(checked) => {
                            const current = field.value || []
                            if (checked) {
                              field.onChange([...current, option.id])
                            } else {
                              field.onChange(current.filter((value) => value !== option.id))
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{option.label}</FormLabel>
                    </FormItem>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="studyHabits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Study Habits</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select when you study" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning Person</SelectItem>
                      <SelectItem value="afternoon">Afternoon</SelectItem>
                      <SelectItem value="evening">Evening</SelectItem>
                      <SelectItem value="night">Night Owl</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sleepTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sleep Time</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select when you sleep" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="before10">Before 10 PM</SelectItem>
                      <SelectItem value="10to12">10 PM - 12 AM</SelectItem>
                      <SelectItem value="after12">After 12 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="noiseLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Noise Tolerance Level</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[field.value]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Quiet Environment</span>
                    <span>Moderate Noise</span>
                    <span>Lively Environment</span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cleanlinessLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cleanliness Level</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[field.value]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Relaxed</span>
                    <span>Moderate</span>
                    <span>Very Clean</span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="smokingFriendly"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Smoking Friendly</FormLabel>
                  <FormDescription>Are you comfortable with a roommate who smokes?</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="petFriendly"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Pet Friendly</FormLabel>
                  <FormDescription>Are you comfortable with pets in your dorm?</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Preferences</FormLabel>
              <FormControl>
                <Textarea placeholder="Any other preferences or requirements..." className="h-32" {...field} />
              </FormControl>
              <FormDescription>
                Please add any other preferences or requirements that weren't covered above.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Update Preferences"}
        </Button>
      </form>
    </Form>
  )
}

