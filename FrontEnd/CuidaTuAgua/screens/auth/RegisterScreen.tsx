import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageStyle,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useResponsive } from "../../hooks/useResponsive";
import { useTheme } from "../../theme";
import { createStyles } from "./RegisterScreen.styles";
import { useTranslation } from "react-i18next";

import InputField from "../../components/auth/InputField";
import CheckboxField from "../../components/auth/CheckboxField";
import PrimaryButton from "../../components/auth/PrimaryButton";
import TermsModal from "../../components/auth/TermsModal";
import FeedbackModal from "../../components/common/FeedbackModal";
import BackArrowButton from "../../components/common/BackArrowButton";

type Props = {
  goToLogin: () => void;
};

type FeedbackType = "info" | "error" | "success";

export default function RegisterScreen({ goToLogin }: Props) {
  const { isWeb, isMobile } = useResponsive();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('register');
  const [fullName, setFullName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [homeName, setHomeName] = useState("");
  const [address, setAddress] = useState("");
  const [stratum, setStratum] = useState("");
  const [inhabitants, setInhabitants] = useState("");

  const [termsVisible, setTermsVisible] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("info");

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

    if (feedbackType === "success") {
      goToLogin();
    }
  };

  const handleRegister = () => {
    if (!fullName.trim())
      return showFeedback(t("feedback.errorTitle"), t("feedback.emptyFullName"), "error");
    if (!document.trim())
      return showFeedback(t("feedback.errorTitle"), t("feedback.emptyDocument"), "error");
    if (!email.trim())
      return showFeedback(t("feedback.errorTitle"), t("feedback.emptyEmail"), "error");
    if (!password.trim())
      return showFeedback(t("feedback.errorTitle"), t("feedback.emptyPassword"), "error");
    if (!homeName.trim())
      return showFeedback(t("feedback.errorTitle"), t("feedback.emptyHomeName"), "error");
    if (!address.trim())
      return showFeedback(t("feedback.errorTitle"), t("feedback.emptyAddress"), "error");
    if (!stratum.trim())
      return showFeedback(t("feedback.errorTitle"), t("feedback.emptyStratum"), "error");
    if (!inhabitants.trim())
      return showFeedback(t("feedback.errorTitle"), t("feedback.emptyInhabitants"), "error");
    if (!acceptedTerms)
      return showFeedback(t("feedback.errorTitle"), t("feedback.termsNotAccepted"), "error");

    // Simulación de registro exitoso
    showFeedback(t("success.title"), t("success.message"), "success");
  };

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={[styles.safeArea, isMobile && styles.safeAreaMobile]}
    >
      <View style={[styles.header, isWeb && styles.headerWeb]}>
        <BackArrowButton onPress={goToLogin} style={styles.backButton} />
        <Text style={styles.title}>{t("title")}</Text>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>
          <View style={[styles.page, isWeb && styles.pageWeb]}>
            <View
              style={[
                styles.container,
                isWeb && styles.card,
                isMobile && styles.cardMobile,
              ]}
            >
              <Text style={[styles.section, isWeb && styles.sectionWeb]}>
                {t("section1.title")}
              </Text>
              <InputField
                value={fullName}
                onChangeText={setFullName}
                placeholder={t("section1.input1") ?? ""}
              />
              <InputField
                value={document}
                onChangeText={setDocument}
                placeholder={t("section1.input2") ?? ""}
              />
              <InputField
                value={email}
                onChangeText={setEmail}
                placeholder={t("section1.input3") ?? ""}
              />
              <InputField
                value={password}
                onChangeText={setPassword}
                placeholder={t("section1.input4") ?? ""}
                secureTextEntry
              />

              <View style={styles.cardBottomSpacing} />
            </View>
            <View
              style={[
                styles.container,
                isWeb && styles.card,
                isMobile && styles.cardMobile,
              ]}
            >
              <Text style={[styles.section, isWeb && styles.sectionWeb]}>
                {t("section2.title")}
              </Text>
              <InputField
                value={homeName}
                onChangeText={setHomeName}
                placeholder={t("section2.input1") ?? ""}
              />
              <InputField
                value={address}
                onChangeText={setAddress}
                placeholder={t("section2.input2") ?? ""}
              />
              <InputField
                value={stratum}
                onChangeText={setStratum}
                placeholder={t("section2.input3") ?? ""}
              />
              <InputField
                value={inhabitants}
                onChangeText={setInhabitants}
                placeholder={t("section2.input4") ?? ""}
              />

              <View style={styles.cardBottom}>
                <CheckboxField
                  checked={acceptedTerms}
                  onPress={() => setAcceptedTerms(!acceptedTerms)}
                  label={t("section2.checkbox")}
                  onLabelPress={() => setTermsVisible(true)}
                />
              </View>
              <TermsModal
                visible={termsVisible}
                onClose={() => setTermsVisible(false)}
              />
            </View>
            <FeedbackModal
              visible={feedbackVisible}
              title={feedbackTitle}
              message={feedbackMessage}
              type={feedbackType}
              onClose={closeFeedback}
            />
            <View
              style={[
                styles.footer,
                { paddingBottom: insets.bottom + 16 },
                isWeb && styles.footerWeb,
              ]}
            >
              <PrimaryButton title="Registrarse" onPress={handleRegister} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
