import { Component } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonFabButton, AlertController, ToastController, IonAvatar, IonItem, IonLabel, IonList,
  IonReorderGroup, IonItemSliding, IonItemOption, IonItemOptions, IonGrid, IonRow, IonCol, IonButton, IonToast, IonFab, IonIcon,
  IonAlert
} from '@ionic/angular/standalone';
import { NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { add, create, trash } from 'ionicons/icons';
import { GroceryServiceService } from '../grocery-service.service';
import { Share, ShareOptions } from '@capacitor/share';


@Component({
  selector: 'app-grocery',
  templateUrl: 'grocery.html',
  styleUrls: ['grocery.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList, IonLabel, IonItem, IonReorderGroup, IonAvatar, IonItemSliding,
    IonItemOption, IonItemOptions, IonGrid, IonRow, IonCol, NgFor, NgIf, IonButton, IonToast, IonIcon, IonFab, IonFabButton, IonAlert]

})



// Grocery Items
export class Grocery {
  title = "Grocery"
  presentToast: any;


  // constructor
  constructor(
    private toastController: ToastController,
    public alertController: AlertController,
    public dataService: GroceryServiceService, ) {
    addIcons({ add, create, trash });
  }

  
  loadItems() {
    return this.dataService.getItems();
  }

  // function that logs a remove-item msg to the console when clicked
  async removeItem(item: any, index: number) {
    console.log("removing item - ", item.name, "index: ", index);

    // toast is supposed to popup when the button is clicked.   
    const toast = await this.toastController.create({
      message: 'Removing item number  ' + Number(index + 1),
      duration: 3000
    });

    await toast.present();
    this.dataService.removeItem(index)
  }

  // function to add an item
  addItem() {
    console.log("Adding an Item");
    this.showAddItemPrompt();
  }

  // function that shares-item msg to the console when clicked
  async shareItem(item: any, index: number) {
    console.log("Sharing item - ", item.name, "index: ", index);
    // toast is supposed to popup when the button is clicked.   
    const toast = await this.toastController.create({
      message: 'Sharing item number  ' + Number(index + 1),
      duration: 3000
    });
    await toast.present();
    
    await Share.share({
      text: "Grocery Item: " + item.name  + " - Quantity: " + item.quantity,
      title: "Shared via Grocery App",
      dialogTitle: 'Share Grocery Item',
      
    })
    
    

    

    
  }
  

  // function to display the add Item using alert controller
  async showAddItemPrompt() {
    // console.log("showAddItemPrompt Function reached")    // for testing
    const prompt = await this.alertController.create({
      header: 'Add Item to List',
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter item name',

        },
        {
          name: 'quantity',
          placeholder: 'Enter quantity',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Cancel Clicked')
          }
        },
        {
          text: 'Save',
          handler: (item: any) => {
            console.log('Save Clicked', item)
            this.dataService.addItem(item);
          }
        }
      ]
    })
    // console.log(prompt, 'const prompt finished')    // for testing 
    await prompt.present();
  }


  // function that logs a remove-item msg to the console when clicked
  async editItem(item: any, index: number) {
    console.log("editing item - ", item.name, "index: ", index);

    // toast is supposed to popup when the button is clicked.   
    const toast = await this.toastController.create({
      message: 'Editing item number  ' + Number(index + 1),
      duration: 3000
    });

    await toast.present();
    this.showEditItemPrompt(item.name, index);

  }
// function to display the edit item using an alert controller
  async showEditItemPrompt(item: any, index: number) {
    console.log(item, 'item number: ', index + 1);
    // console.log('item.name ', item, 'index ', index)      // FOR TESTING 

    const prompt = await this.alertController.create({

      header: "Edit item",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item.quantity
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Cancel clicked')
          }
        },
        {
          text: 'Update',
          handler: (item: any) => {
            console.log('Saved clicked', item, 'Quantity', item.quantity);
            this.dataService.editItem(item, index)

          }
        }
      ]
    })
    await prompt.present();
  }


}