import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';

interface PlantInfo {
  name: string
  variety: string
  plantingDate: string
  harvestDate: string
  lightExposure: string
  idealTemperature: number
  soilHumidity: number
  plantCount: number
  image: string
}

@Component({
  selector: "app-plant-card",
  templateUrl: "./plant-card.component.html",
  styleUrls: ["./plant-card.component.scss"],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule]
})
export class PlantCardComponent implements OnInit {
  plantInfo: PlantInfo = {
    name: "",  // Sera mis à jour avec le nom de la plante cliquée
    variety: "King of the North",
    plantingDate: "2025-01-01",
    harvestDate: "2025-05-01",
    lightExposure: "16H",
    idealTemperature: 26,
    soilHumidity: 30,
    plantCount: 1,  // Valeur par défaut
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5266.jpg-QuOz9sxlu869vlbhhW0iFi39AoZUJQ.jpeg",
  }

  plantId: string = '';
  plantName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.plantId = params['plantId'] || '';
      this.plantName = params['plantName'] || '';
      this.plantInfo.variety = params['plantVariety'] || '';
      this.plantInfo.plantingDate = params['plantingDate'] || '';
      this.plantInfo.name = this.plantName;  // Met à jour le nom de la plante
      this.plantInfo.plantCount = Number(params['plantQuantity']) || 1;  // Récupération de la quantité
      

      if (this.plantId) {
        this.loadPlantDetails(this.plantId);
      }
    });
  }

  onBack() {
    this.router.navigate(['/pot-monitoring']);
  }

  private loadPlantDetails(plantId: string) {
    // Appel à votre service pour charger les détails de la plante
    // this.plantService.getPlantDetails(plantId).subscribe(...)
  }

  startHarvest(): void {
    // Obtenir la date actuelle
    const currentDate = new Date();
    
    // Formater la date au format JJ/MM/AAAA
    const formattedDate = currentDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Mettre à jour la date de récolte
    this.plantInfo.harvestDate = formattedDate;

    console.log("Récolte démarrée pour:", this.plantInfo.name);
    console.log("Date de récolte mise à jour:", formattedDate);
  }
}

