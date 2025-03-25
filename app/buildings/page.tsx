"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, CheckCircle, AlertCircle, Home, Users, Coffee, Utensils, Dumbbell } from "lucide-react"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

export default function BuildingsPage() {
  const buildings = [
    {
      id: "smith-hall",
      name: "Smith Hall",
      type: "Residence Hall",
      floors: 5,
      capacity: 200,
      features: ["Air Conditioning", "Elevator", "Laundry Room", "Common Area", "Study Rooms"],
      status: "Open",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "johnson-hall",
      name: "Johnson Hall",
      type: "Residence Hall",
      floors: 4,
      capacity: 150,
      features: ["Air Conditioning", "Laundry Room", "Common Area"],
      status: "Open",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "east-residence",
      name: "East Residence",
      type: "Apartment Style",
      floors: 6,
      capacity: 300,
      features: ["Air Conditioning", "Elevator", "Laundry Room", "Common Area", "Kitchen", "Private Bathrooms"],
      status: "Open",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0])
  const isMobile = useMobile()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Building Layouts</h2>
        <p className="text-muted-foreground">Explore residence halls and check room availability</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Residence Buildings</CardTitle>
            <CardDescription>Select a building to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className={isMobile ? "h-auto" : "h-[60vh]"}>
              <div className="space-y-2">
                {buildings.map((building) => (
                  <Button
                    key={building.id}
                    variant={selectedBuilding.id === building.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedBuilding(building)}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    {building.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>{selectedBuilding.name}</CardTitle>
                <CardDescription>
                  {selectedBuilding.type} • {selectedBuilding.floors} Floors • Capacity: {selectedBuilding.capacity}{" "}
                  Students
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className={
                  selectedBuilding.status === "Open"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }
              >
                {selectedBuilding.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-md">
              <Image
                src={selectedBuilding.image || "/placeholder.svg"}
                alt={selectedBuilding.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedBuilding.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Building Amenities</h3>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Coffee className="h-4 w-4 text-muted-foreground" />
                    <span>Coffee Shop (1st Floor)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Community Lounges (Each Floor)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-muted-foreground" />
                    <span>Dining Hall (1st Floor)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-muted-foreground" />
                    <span>Fitness Room (Basement)</span>
                  </div>
                </div>
              </div>
            </div>

            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Building Information</AlertTitle>
              <AlertDescription>
                {selectedBuilding.name} is currently at 95% capacity for the Fall semester. Limited rooms are available.
              </AlertDescription>
            </Alert>

            <Tabs defaultValue="floor1" className="w-full">
              <TabsList className="w-full justify-start overflow-auto">
                {Array.from({ length: selectedBuilding.floors }, (_, i) => (
                  <TabsTrigger key={i} value={`floor${i + 1}`}>
                    Floor {i + 1}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Array.from({ length: selectedBuilding.floors }, (_, i) => (
                <TabsContent key={i} value={`floor${i + 1}`}>
                  <BuildingFloorPlan floor={i + 1} buildingId={selectedBuilding.id} />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BuildingFloorPlan({ floor, buildingId }: { floor: number; buildingId: string }) {
  // This would come from an API in a real application
  const rooms = Array.from({ length: 12 }, (_, i) => ({
    id: `${floor}${(i + 1).toString().padStart(2, "0")}`,
    number: `${floor}${(i + 1).toString().padStart(2, "0")}`,
    type: i % 3 === 0 ? "Single" : i % 3 === 1 ? "Double" : "Triple",
    occupied: Math.random() > 0.2,
    accessible: i === 0 || i === 6,
  }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Floor {floor} Layout</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Occupied</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Accessible</span>
          </div>
        </div>
      </div>

      <div className="relative border rounded-md p-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Hallway</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`border rounded-md p-4 text-center cursor-pointer hover:bg-accent/50 ${
                room.accessible ? "border-blue-500" : room.occupied ? "border-red-500" : "border-green-500"
              }`}
            >
              <div className="text-lg font-bold">{room.number}</div>
              <div className="text-xs text-muted-foreground">{room.type} Room</div>
              <div className={`mt-2 text-xs ${room.occupied ? "text-red-500" : "text-green-500"}`}>
                {room.occupied ? (
                  <div className="flex items-center justify-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Occupied
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Available
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Request Room Change</Button>
      </div>
    </div>
  )
}

