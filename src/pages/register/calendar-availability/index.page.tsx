import { getWeekDays } from "@/utils/get-week-days";
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
} from "./styles";

const CalendarAvailabilityFormSchema = z.object({});

export default function CalendarAvailability() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      availability: [
        { weekday: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
        { weekday: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 6, enabled: false, startTime: "08:00", endTime: "18:00" },
      ],
    },
  });

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    control,
    name: "availability",
  });

  const availability = watch("availability");

  async function handleSetCalendarAvailability() {}

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
                  <Text>{weekDays[field.weekday]}</Text>
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

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </CalendarAvailabilityBox>
    </Container>
  );
}
