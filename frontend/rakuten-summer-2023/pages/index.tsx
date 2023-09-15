'use client'

import Layout from "../components/Layout"
import React from 'react'
import Login from "../components/Login"
import { useContext } from "react";

import Head from 'next/head'
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Spacer,
} from '@chakra-ui/react'

import Nav from "../components/Header"

import { LoginUser } from "../pages/_app";
import { useRouter } from 'next/router'
import { useRef, useEffect } from 'react';

export default function CallToActionWithAnnotation() {
  const {userInfo, setUserInfo} = useContext(LoginUser)
  return (
    <>
      {userInfo.userID ? <Nav /> : <Spacer />}
      <Container maxW={'4xl'}>
        
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 20 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Make your food<br />
            <Text as={'span'} color={'teal'}>
              life better
            </Text>
          </Heading>
          <Text color={'gray.500'}>
          "Food is our common ground, a universal experience." - James Beard
          </Text>

          <Login />

        </Stack>
      </Container>
    </>
  )
}

