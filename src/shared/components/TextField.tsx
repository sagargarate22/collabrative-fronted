import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import {type LucideIcon } from "lucide-react";
import { Controller } from "react-hook-form";

export default function TextField(
    {
        name,
        label,
        description,
        type = 'text',
        control,
        placeholder,
        leftIcon : LeftIcon,
        rightIcon: RightIcon,
        classname,
    }:{
        name: string,
        label: string,
        description?: string,
        control: any,
        type?: 'text' | 'password',
        leftIcon?: LucideIcon,
        rightIcon?: LucideIcon,
        placeholder?: string,
        classname?: string
    }
)
{
    return (
        <Controller 
            name={name}
            rules={{required: true}}
            control={control}
            render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm">
                    {label}
                </FieldLabel>
                <div className='relative flex justify-center items-center'>
                    {LeftIcon && <LeftIcon className='absolute left-3 h-5 w-5 text-muted-foreground pointer-events-none'/>}
                    <Input 
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        value={field.value??""}
                        className={clsx('bg-background focus-visible:ring-1 focus-visible:border-blue-700', classname)}
                    />
                    {RightIcon && <RightIcon className='absolute right-3 h-5 w-5 text-muted-foreground pointer-events-none'/>}
                </div>
                {fieldState.error
                    && (
                    <FieldError errors={[fieldState.error]} />
                )}
                {description && (
                    <FieldDescription>
                        {description}
                    </FieldDescription>
                )}
            </Field>
            )}
        />
    )
}