# CountryApp
![Screenshot from the CountryApp]('./')

An Angular app to show my frontend skills. It displays a list of countries and some information about them. You can filter and search, or view a detailed page of a country

## Contents


## ⚙️ Installation & Usage

### Prerequisites
* Latest version of Node LTS/Fermium (14.x)

### Installation
1. Clone the app
	* `git clone https://github.com/iSirThijs/country-app.git`
2. Run `npm install`

### Usage
#### 🔬 For development
* Use `npm run start` to start the app.
* Terminal will tell you the URL to open

#### 🔨 For production
To build the app for production use `npm run build`, the dist folder is the build app

## Design Rationale
During this assignment I have made choses about the apps development and design. In this design rationale I explain the reasoning behind those choices.
### Framework and tools
Before starting this assignment I had no prior or just a tiny bit of framework experience. I consider myself good at JS which and understand how frameworks generally work. I have made one my self as an exercise for school, to figure this out. (You can view it here: [Game Explorer](https://github.com/iSirThijs/web-app-from-scratch-1920)). I tend to not favor frameworks and be framework agnostic. The tooling/framework should fit the use case, not the other way around.

I choose to use Angular as a framework for this app. Mainly because the assignment preferred it. Since I have no prior framework experience I didn't have my own favorite yet. 

This assignment gave me the opportunity to use typescript, which I have always wanted to try out but never found the time for. I really like it, and have started to use it in other projects as well. I used JSdoc alot with vanilla JS, so typescript was a logical next step.

For this project I chose not to use SCSS, since I didn't see the added benefit in this app. Most style and layout can be fixed with Vanilla CSS. I liked to use SCSS/Sass since Vanilla CSS was laking in some stuff, but the current state of CSS makes me prefer vanilla CSS more.

### Code and API
I chose to transform the API results to a typing. This way I could have full control over how a Country is structured. It also allowed me to reuse the API results. This is done by an Angular Service, which the components use to retrieve the data. The Service checks if the data is available in memory and if not will retrieve it from the API. 

The filters also use this service instead of using the URL for filtering directly from the API. The data is already there, so why not use it. 

### App design and UX
The app also needs to look good. So I made a nice design and gave some attention to the UX

#### Country cards and labels
I didn't want the overview page to be a boring list of countries that link to the detailpage. So I have made cards. This allowed me to add some more information about the country. To do this I added labels with all kinds of information. The labels are reused in multiple places, which adds consistency to the app

#### Filters
The filters were hard UX wise. I wanted to combine the region and subregions. Into collapse able filters. Due to me being new to Angular and therefore angular forms and observables I couldn't get this to work.

<!-- Inserst sketch here -->
## What I have learned
* I learned to use the basics of Angular, creating components and dynamically render them based on data
* I learned to use a service class as a proxy for the api and components. 
* I learned the basics of Angular reactive forms
* I learned the basics of Observables (RxJS)
* I learned a lot of typescript

## What I haven't done
* Search is always an exact match, which I would love to have changed based on a RegEX test
* Better UX for the filters (see [Filters]('#filters')) 
