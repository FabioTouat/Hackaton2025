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

  // Stocker la différence initiale en jours
  private initialDiffDays: number | null = null;

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
      this.plantInfo.harvestDate = params['harvestDate'] || '';
      this.plantInfo.name = this.plantName;  // Met à jour le nom de la plante
      this.plantInfo.plantCount = Number(params['plantQuantity']) || 1;  // Récupération de la quantité
      this.plantInfo.image = params['imageUrl'] || '';


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
    // Si c'est le premier clic, calculer et stocker la différence initiale
    if (this.initialDiffDays === null) {
      const plantingDate = new Date(this.plantInfo.plantingDate);
      const firstHarvestDate = new Date(this.plantInfo.harvestDate);
      const diffTime = firstHarvestDate.getTime() - plantingDate.getTime();
      this.initialDiffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Utiliser la différence initiale stockée pour calculer la nouvelle date
    const currentHarvestDate = new Date(this.plantInfo.harvestDate);
    const newHarvestDate = new Date(currentHarvestDate.getTime() + (this.initialDiffDays * 24 * 60 * 60 * 1000));

    // Mettre à jour la date de maturation
    this.plantInfo.harvestDate = newHarvestDate.toISOString().split('T')[0];
  }
}

