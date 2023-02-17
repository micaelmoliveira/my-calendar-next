import { convertTimeStringToMinutes } from "@/utils/convert-time-string-to-minutes";
import { getWeekDays } from "@/utils/get-week-days";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Container, Header } from "../styles";
import {
  CalendarAvailabilityBox,
  CalendarAvailabilityContainer,
  CalendarAvailabilityDay,
  CalendarAvailabilityItem,
  CalendarAvailabilityTime,
  FormError,
} from "./styles";

const CalendarAvailabilityFormSchema = z.object({
  availability: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((availabilities) =>
      availabilities.filter((availability) => availability.enabled)
    )
    .refine((availabilities) => availabilities.length > 0, {
      message: "Você precisa selecionar ao mesmo um dia da semana!",
    })
    .transform((availabilities) => {
      return availabilities.map((availability) => {
        return {
          weekDay: availability.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(
            availability.startTime
          ),
          endTimeInMinutes: convertTimeStringToMinutes(availability.endTime),
        };
      });
    })
    .refine(
      (availabilities) => {
        return availabilities.every(
          (availability) =>
            availability.endTimeInMinutes - 60 >=
            availability.startTimeInMinutes
        );
      },
      {
        message:
          "O horário de término deve ser pelo menos 1 hora distante do início.",
      }
    ),
});

type CalendarAvailabilityFormInput = z.input<typeof CalendarAvailabilityFormSchema>
type CalendarAvailabilityFormOutput = z.output<typeof CalendarAvailabilityFormSchema>

export default function CalendarAvailability() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<CalendarAvailabilityFormInput>({
    resolver: zodResolver(CalendarAvailabilityFormSchema),
    defaultValues: {
      availability: [
        { weekDay: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
        { weekDay: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 6, enabled: false, startTime: "08:00", endTime: "18:00" },
      ],
    },
  });

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    control,
    name: "availability",
  });

  const availability = watch("availability");

  async function handleSetCalendarAvailability(data: any) {
    const outputData = data as CalendarAvailabilityFormOutput

    console.log(outputData);
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <CalendarAvailabilityBox
        as="form"
        onSubmit={handleSubmit(handleSetCalendarAvailability)}
      >
        <CalendarAvailabilityContainer>
          {fields.map((field, index) => {
            return (
              <CalendarAvailabilityItem key={field.id}>
                <CalendarAvailabilityDay>
                  <Controller
                    name={`availability.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true);
                          }}
                          checked={field.value}
                        />
                      );
                    }}
                  />
                  <Text>{weekDays[field.weekDay]}</Text>
                </CalendarAvailabilityDay>
                <CalendarAvailabilityTime>
                  <TextInput
                    size="sm"
                    type="time"
                    step="60"
                    disabled={availability[index].enabled === false}
                    {...register(`availability.${index}.startTime`)}
                  />
                  <TextInput
                    size="sm"
                    type="time"
                    step="60"
                    disabled={availability[index].enabled === false}
                    {...register(`availability.${index}.endTime`)}
                  />
                </CalendarAvailabilityTime>
              </CalendarAvailabilityItem>
            );
          })}
        </CalendarAvailabilityContainer>

        {errors.availability && (
          <FormError size="sm">{errors.availability.message}</FormError>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </CalendarAvailabilityBox>
    </Container>
  );
}
