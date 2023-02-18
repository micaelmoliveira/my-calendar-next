import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight, Check } from "phosphor-react";
import { Container, Header } from "../styles";
import { AuthError, CalendarBox, CalendarItem } from "./styles";

export default function Calendar() {
  const router = useRouter();
  const session = useSession();

  const hasAuthError = !!router.query.error;
  const isAuthenticated = session.status === "authenticated";

  async function handleConnectCalendar() {
    await signIn("google", { callbackUrl: "/register/calendar" });
  }

  function handleNextPage() {
    router.push('/register/calendar-availability')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <CalendarBox>
        <CalendarItem>
          <Text>Google Calendar</Text>
          {isAuthenticated ? (
            <Button size="sm" disabled>
              Conecatdo
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </CalendarItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </AuthError>
        )}

        <Button type="submit" disabled={!isAuthenticated} onClick={handleNextPage}>
          Próximo passo
          <ArrowRight />
        </Button>
      </CalendarBox>
    </Container>
  );
}
