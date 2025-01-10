const components = document.querySelectorAll('.component-item button');
        const selectedComponents = {
            motherboard: null,
            cpu: null,
            ram: null,
            gpu: null,
            storage: null,
            monitor: null,
            mouse: null,
            keyboard: null
        };

        const updateConfiguration = () => {
            Object.keys(selectedComponents).forEach(key => {
                const element = document.getElementById(`selected-${key}`);
                element.innerText = selectedComponents[key] ? selectedComponents[key].name : 'Nincs kiválasztva';
            });

            const totalPrice = Object.values(selectedComponents).reduce((sum, component) => sum + (component?.price || 0), 0);
            document.getElementById('total-price').innerText = totalPrice;
        };

        const addSampleComponents = () => {
            const categories = {
                motherboard: [
                    { name: "ASUS PRIME B550-PLUS", parameters: "AM4, DDR4, ATX", price: 45000 },
                    { name: "Gigabyte B660 DS3H", parameters: "LGA1700, DDR4, ATX", price: 55000 },
                    { name: "MSI MAG B550 TOMAHAWK", parameters: "AM4, DDR4, ATX", price: 60000 }
                ],
                cpu: [
                    { name: "Intel Core i7-12700K", parameters: "8 mag, 16 szál, 3.6 GHz", price: 120000 },
                    { name: "AMD Ryzen 7 5800X", parameters: "8 mag, 16 szál, 3.8 GHz", price: 110000 },
                    { name: "Intel Core i5-13600K", parameters: "6 mag, 12 szál, 3.5 GHz", price: 90000 }
                ],
                ram: [
                    { name: "Kingston Fury 16GB", parameters: "DDR4, 3600MHz", price: 32000 },
                    { name: "G.Skill Ripjaws V 32GB", parameters: "DDR4, 3200MHz", price: 60000 },
                    { name: "Corsair Vengeance 16GB", parameters: "DDR4, 3200MHz", price: 30000 }
                ],
                gpu: [
                    { name: "AMD Radeon RX 6700 XT", parameters: "12GB GDDR6", price: 170000 },
                    { name: "NVIDIA GeForce RTX 3070", parameters: "8GB GDDR6", price: 200000 },
                    { name: "NVIDIA GeForce RTX 3060", parameters: "12GB GDDR6", price: 150000 }
                ],
                storage: [
                    { name: "Crucial MX500 2TB", parameters: "SATA SSD", price: 65000 },
                    { name: "Seagate Barracuda 4TB", parameters: "HDD", price: 40000 },
                    { name: "Samsung 980 Pro 1TB", parameters: "NVMe SSD", price: 75000 }
                ],
                monitor: [

                    { name: "Dell S2721DGF", parameters: "27\", QHD, 165Hz", price: 120000 },
                    { name: "Samsung Odyssey G7", parameters: "32\", QHD, 240Hz", price: 200000 },
                    { name: "LG UltraGear 24GL600F", parameters: "24\", FHD, 144Hz", price: 90000 }
                ],
                mouse: [
                    { name: "Razer DeathAdder V2", parameters: "20,000 DPI", price: 25000 },
                    { name: "SteelSeries Rival 3", parameters: "8,500 DPI", price: 15000 },
                    { name: "Logitech G502 HERO", parameters: "25,600 DPI", price: 30000 }
                ],
                keyboard: [
                    { name: "Razer BlackWidow V3", parameters: "Mechanikus, RGB", price: 50000 },
                    { name: "Logitech G915 TKL", parameters: "Vezeték nélküli, RGB", price: 60000 },
                    { name: "Corsair K95 RGB Platinum", parameters: "Mechanikus, RGB", price: 65000 }
                ]
            };

            Object.keys(categories).forEach(category => {
                const container = document.getElementById(category);

                categories[category].forEach(component => {
                    const componentDiv = document.createElement('div');
                    componentDiv.classList.add('component-item');
                    componentDiv.dataset.category = category;
                    componentDiv.dataset.name = component.name;
                    componentDiv.dataset.parameters = component.parameters;
                    componentDiv.dataset.price = component.price;

                    componentDiv.innerHTML = `
                        <p>${component.name}</p>
                        <p>${component.parameters}</p>
                        <p>Ár: ${component.price} Ft</p>
                        <button>Választ</button>
                    `;

                    container.appendChild(componentDiv);
                });
            });
        };
        addSampleComponents();

        document.querySelectorAll('.component-item button').forEach(button => {
            button.addEventListener('click', () => {
                const componentItem = button.parentElement;
                const category = componentItem.dataset.category;
                const name = componentItem.dataset.name;
                const parameters = componentItem.dataset.parameters;
                const price = parseInt(componentItem.dataset.price, 10);

                selectedComponents[category] = { name, parameters, price };

                document.querySelectorAll(`.component-item[data-category='${category}']`).forEach(item => {
                    item.classList.remove('selected');
                });
                componentItem.classList.add('selected');

                updateConfiguration();
            });
        });

        document.getElementById('order-button').addEventListener('click', () => {
            const missingComponents = Object.keys(selectedComponents).filter(key => !selectedComponents[key]);

            if (missingComponents.length > 0) {
                alert(`Hiányzó alkatrészek: ${missingComponents.join(', ')}`);
            } else {
                alert('A konfiguráció sikeresen összeállítva és megrendelve!');
            }
        });