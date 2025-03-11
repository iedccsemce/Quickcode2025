package com.presentation.app;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class MainApp extends Application {

    private static final String IMAGE_FOLDER = "file:images/"; // Path to images
    private static final String DEFAULT_IMAGE = "default.jpg"; // Default image
    private ImageView imageView;

    @Override
    public void start(Stage primaryStage) {
        // Initialize ImageView
        imageView = new ImageView();
        imageView.setFitWidth(500);
        imageView.setPreserveRatio(true);
        
        // Button to trigger speech recognition
        Button startRecognitionButton = new Button("Start Speech Recognition");
        startRecognitionButton.setOnAction(e -> startPythonSpeechRecognition());

        // Layout setup
        VBox layout = new VBox(10, startRecognitionButton, imageView);
        Scene scene = new Scene(layout, 600, 500);

        primaryStage.setTitle("Voice-Controlled Presentation");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    private void startPythonSpeechRecognition() {
        try {
            // Run Python script to capture voice input
            ProcessBuilder pb = new ProcessBuilder("python", "speech_recognition.py");
            Process process = pb.start();
            process.waitFor(); // Wait for Python to finish

            // Update image based on recognized text
            updateImage();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    private void updateImage() {
        String recognizedText = readRecognizedText("recognized_text.txt");
        System.out.println("Recognized Text: " + recognizedText);

        String imagePath = IMAGE_FOLDER + recognizedText + ".jpg";
        Image image;
        try {
            image = new Image(imagePath);
            if (image.isError()) {
                throw new Exception("Image not found, loading default.");
            }
        } catch (Exception e) {
            System.out.println("Error loading image. Using default.");
            image = new Image(IMAGE_FOLDER + DEFAULT_IMAGE);
        }

        imageView.setImage(image);
    }

    private String readRecognizedText(String filePath) {
        try {
            return new String(Files.readAllBytes(Paths.get(filePath))).trim();
        } catch (IOException e) {
            System.out.println("Error reading recognized text file.");
            return "default";
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}