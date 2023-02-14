import { Box, styled, Text } from "@ignite-ui/react";

export const CalendarBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column'
})

export const CalendarItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  border: '1px solid $gray600',
  padding: '$4 $6',
  borderRadius: '$md',

  marginBottom: '$4'
})

export const AuthError = styled(Text, {
  color: '#f75a68',
  marginBottom: '$4'
})