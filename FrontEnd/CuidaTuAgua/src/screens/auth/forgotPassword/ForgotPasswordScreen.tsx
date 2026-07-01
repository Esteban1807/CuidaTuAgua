import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from "@theme/index";
import { useTranslation } from "react-i18next";
import { useResponsive } from "@hooks/useResponsive";
import { createStyles } from "./ForgotPasswordScreen.styles";

import InputField from "@components/auth/InputField";
import PrimaryButton from "@components/auth/PrimaryButton";
import BackArrowButton from "@components/common/BackArrowButton";
import FeedbackModal from "@components/common/FeedbackModal";

type Props = {
  goToLogin: () => void;
};

type FeedbackType = "info" | "error" | "success";
type Step = "identifier" | "code" | "newPassword";

const STORAGE_KEY_USERS = "cuidatuagua-users";

export default function ForgotPasswordScreen({ goToLogin }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation("login");
  const { isWeb, isMobile } = useResponsive();

  const [step, setStep] = useState<Step>("identifier");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("info");

  const [foundUser, setFoundUser] = useState<any>(null);

  const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);
  const isValidDocument = (value: string) => /^[0-9]{8,}$/.test(value);
  const isValidPassword = (value: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/.test(value);

  const showFeedback = (
    title: string,
    message: string,
    type: FeedbackType = "info",
  ) => {
    setFeedbackTitle(title);
    setFeedbackMessage(message);
    setFeedbackType(type);
    setFeedbackVisible(true);
  };

  const closeFeedback = () => {
    setFeedbackVisible(false);
  };

  const handleStep1 = async () => {
    const trimmed = identifier.trim();

    if (!trimmed) {
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.emptyIdentifier"),
        "error",
      );
    }

    const isEmail = trimmed.includes("@");
    if (isEmail && !isValidEmail(trimmed)) {
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.invalidIdentifier"),
        "error",
      );
    }

    if (!isEmail && !isValidDocument(trimmed)) {
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.invalidIdentifier"),
        "error",
      );
    }

    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY_USERS);
      const users = raw ? (JSON.parse(raw) as any[]) : [];

      const user = users.find(u =>
        trimmed.toLowerCase() === (u.email || "").toLowerCase() ||
        trimmed === u.document
      );

      if (!user) {
        return showFeedback(
          t("feedback.errorTitle"),
          "forgotPassword.userNotFound" in t
            ? t("forgotPassword.userNotFound")
            : "Usuario no encontrado",
          "error",
        );
      }

      setFoundUser(user);
      setStep("code");
      showFeedback(
        "forgotPassword.codeSent" in t ? t("forgotPassword.codeSent") : "Código enviado",
        "forgotPassword.codeMessage" in t
          ? t("forgotPassword.codeMessage")
          : "Se ha enviado un código a tu correo electrónico. Ingresa los 6 dígitos.",
        "info",
      );
    } catch (error) {
      showFeedback(t("feedback.errorTitle"), t("feedback.errorMessage"), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStep2 = () => {
    if (!code || code.length !== 6) {
      return showFeedback(
        t("feedback.errorTitle"),
        "forgotPassword.invalidCode" in t
          ? t("forgotPassword.invalidCode")
          : "El código debe tener 6 dígitos",
        "error",
      );
    }

    setStep("newPassword");
    showFeedback(
      "forgotPassword.codeValid" in t ? t("forgotPassword.codeValid") : "Código válido",
      "forgotPassword.changePassword" in t
        ? t("forgotPassword.changePassword")
        : "Ahora crea tu nueva contraseña",
      "info",
    );
  };

  const handleStep3 = async () => {
    if (!newPassword.trim()) {
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.emptyPassword"),
        "error",
      );
    }

    if (!isValidPassword(newPassword.trim())) {
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.passwordFormat"),
        "error",
      );
    }

    if (newPassword !== confirmPassword) {
      return showFeedback(
        t("feedback.errorTitle"),
        "forgotPassword.passwordMismatch" in t
          ? t("forgotPassword.passwordMismatch")
          : "Las contraseñas no coinciden",
        "error",
      );
    }

    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY_USERS);
      const users = raw ? (JSON.parse(raw) as any[]) : [];

      const index = users.findIndex(
        u => u.document === foundUser.document && u.email === foundUser.email
      );

      if (index !== -1) {
        users[index].password = newPassword.trim();
        await AsyncStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
      }

      showFeedback(
        "forgotPassword.passwordChanged" in t
          ? t("forgotPassword.passwordChanged")
          : "Contraseña actualizada",
        "forgotPassword.passwordSuccess" in t
          ? t("forgotPassword.passwordSuccess")
          : "Tu contraseña ha sido actualizada correctamente",
        "success",
      );

      setTimeout(() => {
        setFeedbackVisible(false);
        goToLogin();
      }, 2000);
    } catch (error) {
      showFeedback(t("feedback.errorTitle"), t("feedback.errorMessage"), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step === "identifier") handleStep1();
    else if (step === "code") handleStep2();
    else if (step === "newPassword") handleStep3();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={[styles.header, isWeb && styles.headerWeb]}>
        <BackArrowButton onPress={goToLogin} style={styles.backButton} />
        <Text style={[styles.title, isMobile && styles.titleMobile]}>
          {step === "identifier"
            ? "forgotPassword.title" in t
              ? t("forgotPassword.title")
              : "Recuperar contraseña"
            : step === "code"
              ? "forgotPassword.codeTitle" in t
                ? t("forgotPassword.codeTitle")
                : "Verificar código"
              : "forgotPassword.newPasswordTitle" in t
                ? t("forgotPassword.newPasswordTitle")
                : "Nueva contraseña"}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEnabled={isWeb}
      >
        <View style={[styles.wrapper]}>
          <View style={[styles.page, isWeb && styles.pageWeb]}>
            {/* STEPS INDICATOR */}
            {!isWeb && (
              <View style={styles.stepsContainer}>
                {["1", "2", "3"].map((num, idx) => {
                  const currentStep = step === "identifier" ? 0 : step === "code" ? 1 : 2;
                  const isActive = idx === currentStep;
                  const isCompleted = idx < currentStep;

                  return (
                    <View key={num} style={styles.step}>
                      <View
                        style={[
                          styles.stepNumber,
                          isActive && styles.stepNumberActive,
                          isCompleted && styles.stepNumberCompleted,
                        ]}
                      >
                        <Text
                          style={[
                            styles.stepNumberText,
                            (isActive || isCompleted) && styles.stepNumberTextActive,
                          ]}
                        >
                          {isCompleted ? "✓" : num}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.stepLabel,
                          isActive && styles.stepLabelActive,
                        ]}
                      >
                        {num === "1"
                          ? "Identidad"
                          : num === "2"
                            ? "Código"
                            : "Contraseña"}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}

            {/* CARD CONTENT */}
            <View style={[styles.card, isMobile && styles.cardMobile]}>
              <View style={[styles.container, isWeb && styles.containerWeb]}>
                {/* STEP 1: IDENTIFIER */}
                {step === "identifier" && (
                  <>
                    <Text style={[styles.section, isWeb && styles.sectionWeb]}>
                      {
                        "forgotPassword.step1Title" in t
                          ? t("forgotPassword.step1Title")
                          : "Ingresa tu correo o documento"
                      }
                    </Text>
                    <Text style={styles.subtitle}>
                      {
                        "forgotPassword.codeMessage" in t
                          ? t("forgotPassword.codeMessage")
                          : "Te enviaremos un código de 6 dígitos para verificar tu identidad"
                      }
                    </Text>
                    <View style={styles.inputContainer}>
                      <InputField
                        value={identifier}
                        onChangeText={setIdentifier}
                        placeholder={
                          t("form.mail") || "correo@ejemplo.com o 12345678"
                        }
                      />
                    </View>
                  </>
                )}

                {/* STEP 2: CODE */}
                {step === "code" && (
                  <>
                    <Text style={[styles.section, isWeb && styles.sectionWeb]}>
                      {
                        "forgotPassword.step2Title" in t
                          ? t("forgotPassword.step2Title")
                          : "Verifica tu código"
                      }
                    </Text>
                    <Text style={styles.subtitle}>
                      Hemos enviado un código de 6 dígitos a tu correo
                    </Text>
                    <View style={styles.infoBox}>
                      <Text style={styles.infoBoxText}>
                        Revisa tu bandeja de entrada o carpeta de spam
                      </Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <InputField
                        value={code}
                        onChangeText={(v) => setCode(v.replace(/[^0-9]/g, "").slice(0, 6))}
                        placeholder="000000"
                        keyboardType="numeric"
                        maxLength={6}
                      />
                    </View>
                  </>
                )}

                {/* STEP 3: NEW PASSWORD */}
                {step === "newPassword" && (
                  <>
                    <Text style={[styles.section, isWeb && styles.sectionWeb]}>
                      {
                        "forgotPassword.step3Title" in t
                          ? t("forgotPassword.step3Title")
                          : "Crea tu nueva contraseña"
                      }
                    </Text>
                    <Text style={styles.subtitle}>
                      Asegúrate de usar mayúsculas, minúsculas y caracteres especiales
                    </Text>
                    <View style={styles.inputContainer}>
                      <InputField
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder={t("form.password") || "Nueva contraseña"}
                        secureTextEntry
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <InputField
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder={
                          "forgotPassword.confirmPassword" in t
                            ? t("forgotPassword.confirmPassword")
                            : "Confirmar contraseña"
                        }
                        secureTextEntry
                      />
                    </View>
                  </>
                )}
              </View>
            </View>

            {/* FOOTER / BUTTON */}
            <View style={[styles.footer, isWeb && styles.footerWeb]}>
              <PrimaryButton
                title={
                  step === "newPassword"
                    ? "forgotPassword.updateButton" in t
                      ? t("forgotPassword.updateButton")
                      : "Actualizar contraseña"
                    : "forgotPassword.nextButton" in t
                      ? t("forgotPassword.nextButton")
                      : "Siguiente"
                }
                onPress={handleNext}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <FeedbackModal
        visible={feedbackVisible}
        title={feedbackTitle}
        message={feedbackMessage}
        type={feedbackType}
        onClose={closeFeedback}
      />
    </SafeAreaView>
  );
}
