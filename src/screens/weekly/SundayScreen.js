import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { WebView } from 'react-native-webview';

const SundayScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#444" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.dayTitle}>Sunday</Text>
      <Text style={styles.workoutTitle}>Rest & Recovery 😴</Text>

      {/* Recovery Plan */}
      <View style={styles.workoutBlock}>
        <Text style={styles.blockTitle}>Recovery Plan 🧘</Text>
        <Text style={styles.blockText}>• Light Stretching – 10 mins</Text>
        <Text style={styles.blockText}>• Hydration – drink 2–3L of water</Text>
        <Text style={styles.blockText}>• Read books</Text>
        <Text style={styles.blockText}>• Optional: Walk or light yoga – 20 mins</Text>
        <Text style={styles.blockText}>• Foam rolling or massage</Text>
        <Text style={styles.blockText}>• Early sleep (7–9 hours)</Text>
      </View>

      {/* Ambient Playlist */}
      <View style={styles.workoutBlock}>
        <Text style={styles.sectionTitle}>🧘 Ambient Playlist</Text>
        <WebView
          source={{ uri: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX3Ogo9pFvBkY' }}
          style={styles.webview}
        />
      </View>

      {/* Chill Beats Playlist */}
      <View style={styles.workoutBlock}>
        <Text style={styles.sectionTitle}>🎧 Chill Beats</Text>
        <WebView
          source={{ uri: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6' }}
          style={styles.webview}
        />
      </View>

      {/* Mindfulness Podcast */}
      <View style={styles.workoutBlock}>
        <Text style={styles.sectionTitle}>🎙️ Mindfulness Podcast</Text>
        <WebView
          source={{ uri: 'https://open.spotify.com/embed/show/4rOoJ6Egrf8K2IrywzwOMk' }}
          style={styles.webview}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#444',
    fontWeight: 'bold',
  },
  dayTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e85d04',
    marginBottom: 20,
    paddingTop: 20,
    textAlign: 'center',
  },
  workoutBlock: {
    backgroundColor: '#edede9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 24,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  blockText: {
    fontSize: 14,
    marginBottom: 6,
    color: '#444',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  webview: {
    height: 80,
    borderRadius: 8,
  },
});

export default SundayScreen;
