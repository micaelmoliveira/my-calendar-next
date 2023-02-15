import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Container, Header } from "../styles";
import {
  CalendarAvailabilityBox,
  CalendarAvailabilityContainer,
  CalendarAvailabilityDay,
  CalendarAvailabilityItem,
  CalendarAvailabilityTime,
} from "./styles";

export default function CalendarAvailability() {
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

      <CalendarAvailabilityBox as="form">
        <CalendarAvailabilityContainer>
          <CalendarAvailabilityItem>
            <CalendarAvailabilityDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </CalendarAvailabilityDay>
            <CalendarAvailabilityTime>
              <TextInput 
                size="sm"
                type="time"
                step="60"
              />
              <TextInput 
                size="sm"
                type="time"
                step="60"
              />
            </CalendarAvailabilityTime>
          </CalendarAvailabilityItem>
          <CalendarAvailabilityItem>
            <CalendarAvailabilityDay>
              <Checkbox />
              <Text>Terça-feira</Text>
            </CalendarAvailabilityDay>
            <CalendarAvailabilityTime>
              <TextInput 
                size="sm"
                type="time"
                step="60"
              />
              <TextInput 
                size="sm"
                type="time"
                step="60"
              />
            </CalendarAvailabilityTime>
          </CalendarAvailabilityItem>
        </CalendarAvailabilityContainer>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </CalendarAvailabilityBox>
    </Container>
  );
}
