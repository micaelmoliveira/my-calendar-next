import { api } from "@/lib/axios";
import { buildAuthOptions } from "@/pages/api/auth/[...nextauth].api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Heading, MultiStep, Text, TextArea } from "@ignite-ui/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Container, Header } from "../styles";
import { FormAnnotation, ProfileBox } from "./styles";

const updateFormSchema = z.object({
  bio: z.string(),
});

type UpdateFormData = z.infer<typeof updateFormSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateFormSchema),
  });

  const session = useSession()
  const router = useRouter()

  async function handleUpdateProfile(data: UpdateFormData) {
    await api.put('/users/profile', {
      bio: data.bio
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Olá!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Foto de perfil</Text>
          <Avatar src={session.data?.user.avatar_url} alt={session.data?.user.name} />
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register("bio")} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em usa página pessoal.
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

  const session : any = await getServerSession(req, res, buildAuthOptions(req, res));

  return {
    props: {
      session,
    },
  }
}