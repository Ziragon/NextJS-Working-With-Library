// components/radix/Dropdown.tsx
'use client'

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/lib/utils"

export interface DropdownItem {
    label: string
    onClick?: () => void
}

export interface DropdownProps {
    trigger: React.ReactNode
    items: DropdownItem[]
}

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-md border-2 border-neutral-700 bg-neutral-800 p-2 shadow-xl text-white",
                className
            )}
            {...props}
        />
    </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-md px-3 py-2 text-sm font-medium outline-none hover:bg-neutral-700 transition-colors",
            className
        )}
        {...props}
    />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export const Dropdown = ({ trigger, items }: DropdownProps) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {items.map((item, index) => (
                <DropdownMenuItem
                    key={index}
                    onClick={item.onClick}
                >
                    {item.label}
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
)