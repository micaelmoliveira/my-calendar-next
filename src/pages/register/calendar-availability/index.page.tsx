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
import { useFieldArray, useForm } from "react-hook-form";
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
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      availability: [
        { weekday: 0, enable: false, startTime: "08:00", endTime: "18:00" },
        { weekday: 1, enable: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 2, enable: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 3, enable: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 4, enable: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 5, enable: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 6, enable: false, startTime: "08:00", endTime: "18:00" },
      ],
    },
  });

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    control,
    name: "availability",
  });

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
                  <Checkbox />
                  <Text>{weekDays[field.weekday]}</Text>
                </CalendarAvailabilityDay>
                <CalendarAvailabilityTime>
                  <TextInput size="sm" type="time" step="60" {...register(`availability.${index}.startTime`)} />
                  <TextInput size="sm" type="time" step="60" {...register(`availability.${index}.endTime`)} />
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
