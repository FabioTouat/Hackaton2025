import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface SoilMeasurement {
  label: string;
  value: number;
  unit: string;
  bottomValue: number;
  topValue: number;
  type?: 'ph' | 'normal';
  tooltip?: string;
}

interface ChatMessage {
  text: string;
  isUser: boolean;
}

@Component({
  selector: 'app-dirt-analyze',
  templateUrl: './dirt-analyze.component.html',
  styleUrls: ['./dirt-analyze.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FooterComponent,
    HeaderComponent
  ]
})
export class DirtAnalyzeComponent implements OnInit {
  @ViewChild('chatMessages') private messagesContainer!: ElementRef;
  
  messages: ChatMessage[] = [];
  currentMessage = '';

  leftColumn: SoilMeasurement[] = [
    { 
      label: 'PH',
      value: 6.9,
      unit: '',
      bottomValue: 6,
      topValue: 8,
      type: 'ph',
      tooltip: 'Un pH neutre (7) est idéal. En dessous, le sol est acide, au-dessus il est basique.'
    },
    { 
      label: 'Phosphore',
      value: 458,
      unit: 'ppm',
      bottomValue: 200,
      topValue: 350,
      tooltip: 'Pour augmenter : ajouter du compost, du fumier ou des engrais phosphatés.'
    },
    { 
      label: 'Potassium',
      value: 52,
      unit: 'ppm',
      bottomValue: 60,
      topValue: 120,
      tooltip: 'Pour augmenter : ajouter des cendres de bois, du compost ou des algues marines.'
    },
    { 
      label: 'Calcium',
      value: 2534,
      unit: 'ppm',
      bottomValue: 1500,
      topValue: 2700,
      tooltip: 'Pour augmenter : ajouter de la chaux ou des coquilles d\'œufs broyées.'
    },
    { 
      label: 'Magnesium',
      value: 172,
      unit: 'ppm',
      bottomValue: 50,
      topValue: 150,
      tooltip: 'Pour augmenter : ajouter du sel d\'Epsom ou de la dolomie.'
    }
  ];

  statusIndicators = [
    { label: 'Faible', color: 'rouge' },
    { label: 'Moyen', color: 'jaune' },
    { label: 'Bon', color: 'vert' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Message de bienvenue initial
    this.messages.push({
      text: "Bonjour ! Je peux vous aider à interpréter vos analyses de sol. Que souhaitez-vous savoir ?",
      isUser: false
    });
  }

  async sendMessage() {
    if (!this.currentMessage.trim()) return;

    // Ajoute le message de l'utilisateur
    this.messages.push({
      text: this.currentMessage,
      isUser: true
    });

    const userMessage = this.currentMessage;
    this.currentMessage = '';

    // Prépare le contexte avec les mesures actuelles
    const context = this.leftColumn.map(m => 
      `${m.label}: ${m.value}${m.unit}`
    ).join(', ');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.messages.push({
          text: "Vous devez être connecté pour utiliser le chat.",
          isUser: false
        });
        return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      const response = await this.http.post<{advice: string}>(
        'http://localhost:5000/api/ai/generate-advice', 
        {
          plant: 'any plant',
          condition: `Based on these soil measurements: ${context}. Question: ${userMessage}`
        },
        { headers }
      ).toPromise();

      console.log('API Response:', response);

      if (!response) {
        throw new Error('No response from API');
      }

      // Ajoute la réponse de l'AI
      this.messages.push({
        text: response!.advice.trim(),
        isUser: false
      });

      // Scroll vers le bas
      setTimeout(() => {
        this.scrollToBottom();
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      this.messages.push({
        text: "Désolé, je n'ai pas pu obtenir de réponse. Veuillez réessayer.",
        isUser: false
      });
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = 
        this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }

  getValueColor(measurement: SoilMeasurement): string {
    if (measurement.type === 'ph') {
      if (measurement.value >= 6.8 && measurement.value <= 7.2) {
        return '#4CAF50'; // vert - neutre
      } else if (measurement.value > 7) {
        return measurement.value > 8 ? '#f44336' : '#ffc107'; // rouge si > 8, jaune sinon
      } else {
        return measurement.value < 6 ? '#f44336' : '#ffc107'; // rouge si < 6, jaune sinon
      }
    }
    if (measurement.value > measurement.topValue) {
      return '#4CAF50';
    } else if (measurement.value < measurement.bottomValue) {
      return '#f44336';
    } else {
    
        return '#ffc107';
      
    }
  }

  getPhLabel(value: number): string {
    if (value === 7) return 'Neutre';
    if (value > 7) return 'Basique';
    return 'Acide';
  }
}