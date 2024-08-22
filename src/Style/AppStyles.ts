import { SxProps } from "@mui/material";

// Mise à jour du conteneur principal pour plus de padding et de centrage
export const appContainerStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  mt: 4,
  padding: "2rem",
  backgroundColor: "#f5f5f5", // Couleur de fond douce
  borderRadius: "8px", // Bords arrondis pour une apparence plus moderne
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Ombre subtile pour donner de la profondeur
};

// Style du titre avec une police plus grande et plus d'espace autour
export const titleStyle: SxProps = {
  textDecoration: "underline",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: "2rem", // Augmenter la taille de la police pour le titre
  color: "#3f51b5", // Utiliser une couleur primaire pour le titre
  marginBottom: "1rem",
};

// Message pour l'absence de tâches avec une meilleure mise en forme
export const noTaskMessageStyle: SxProps = {
  fontWeight: "bold",
  mt: 6,
  fontSize: "1.2rem", // Augmenter la taille du message pour une meilleure lisibilité
  color: "#757575", // Couleur grise douce pour un look moins agressif
};

// Titre de la liste des tâches avec un espacement équilibré
export const taskListTitleStyle: SxProps = {
  textAlign: "center",
  fontWeight: "bold",
  mt: 2,
  mb: 2,
  fontSize: "1.5rem", // Augmenter la taille du titre des listes
  color: "#4caf50", // Couleur verte pour indiquer la progression ou la complétion
};
