import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evenements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evenements.html',
  styleUrls: ['./evenements.css']
})
export class Evenements {
  upcomingEvents = [
    {
      id: 1,
      title: 'Conférence Web 3.0 & IA',
      date: '2024-03-15',
      time: '14:00',
      location: 'Douala - Akwa',
      type: 'Conférence',
      price: 53000,
      image: 'assets/img/evenements1.png',
      description: 'Découvrez les dernières innovations du Web 3.0 et de l\'IA',
      speakers: ['Expert IA', 'Développeur Blockchain'],
      capacity: 200,
      registered: 156
    },
    {
      id: 2,
      title: 'Atelier Crypto Trading',
      date: '2024-03-22',
      time: '10:00',
      location: 'En ligne',
      type: 'Atelier',
      price: 29000,
      image: 'assets/img/crypto1.png',
      description: 'Apprenez les stratégies de trading crypto avec nos experts',
      speakers: ['Trader Pro'],
      capacity: 50,
      registered: 38
    },
    {
      id: 3,
      title: 'Networking Entrepreneurs',
      date: '2024-04-05',
      time: '18:30',
      location: 'Yaoundé - Centre-ville',
      type: 'Networking',
      price: 15000,
      image: 'assets/img/evenements2.png',
      description: 'Rencontrez d\'autres entrepreneurs et élargissez votre réseau',
      speakers: ['Entrepreneurs succès'],
      capacity: 100,
      registered: 67
    }
  ];

  pastEvents = [
    {
      title: 'Webinaire Marketing Digital',
      date: '2024-02-10',
      participants: 300,
      rating: 4.8
    },
    {
      title: 'Formation React Avancé',
      date: '2024-01-25',
      participants: 85,
      rating: 4.9
    }
  ];

  registerForEvent(eventId: number) {
    console.log('Inscription à l\'event:', eventId);
    alert('Inscription réussie ! Vous recevrez un email de confirmation.');
  }

  getAvailableSpots(event: any): number {
    return event.capacity - event.registered;
  }

  getProgressPercentage(event: any): number {
    return (event.registered / event.capacity) * 100;
  }
}