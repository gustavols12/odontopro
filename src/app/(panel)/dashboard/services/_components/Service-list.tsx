"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, X } from "lucide-react";
import { DialogService } from "./dialog-sevice";
import { Service } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { deleteService } from "../_actions/delete-service";
import { toast } from "sonner";

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleDeleteService(serviceId: string) {
    const response = await deleteService({ serviceId: serviceId });

    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.success(response.data);
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="text-xl md:text-2xl font-bold">
              Serviços
            </CardTitle>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4" />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogService
                closeModal={() => {
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="space-y-4 mt-5">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="flex items-center justify-between"
                >
                  <div className=" flex items-center space-x-2">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-gray-500">-</span>
                    <span className="text-gray-500">
                      {(service.price / 100).toLocaleString("pt-br", {
                        currency: "BRL",
                        style: "currency",
                      })}
                    </span>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  );
}
