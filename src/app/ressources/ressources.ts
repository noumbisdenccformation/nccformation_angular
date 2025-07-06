import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ressources',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ressources.html',
  styleUrls: ['./ressources.css']
})
export class Ressources implements AfterViewInit {

  ngAfterViewInit() {
    const images = document.querySelectorAll('#pdf-groups-container img');
    
    images.forEach(image => {
      image.addEventListener('click', (event) => {
        const target = event.target as HTMLImageElement;
        const pdfFileName = target.src.replace(/\.png$/, '.pdf');
        window.open(pdfFileName, '_blank');
      });
    });
  }
} 