import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullitem from "./components/ShowFullitem";


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      /* Масив - кошик */
      orders: [],
      /* Відсортований масив - відображення товарів на даний момент часу */
      currentItems: [],
      /* Масив - всі доступні товари */
      items:[
        {
          id:1,
          title: 'Стілець сірий',
          img: 'chair-grey.jpeg',
          desc: `Сірий стілець у сучасному стилі з оксамитовою оббивкою та металевими ніжками, ідеально підходить для кухні, вітальні або офісу. Виробник – Китай.`,
          category: 'chairs',
          price: '49.99'
        },
        {
          id:2,
          title: 'Стіл білий',
          img: 'table.webp',
          desc: `Сучасний робочий стіл з металевими ніжками та білим корпусом із МДФ, оснащений трьома шухлядами для зберігання. Ідеально підходить для офісу чи домашнього використання. Виробник – Китай.`,
          category: 'tables',
          price: '149.00'
        },
        {
          id:3,
          title: 'Диван сірий',
          img: 'sofa.jpeg',
          desc: `Стильний сірий кутовий диван з м'якою оббивкою та містким відділенням для зберігання. Ідеальний для вітальні, забезпечує комфорт і функціональність. Виробник – В'єтнам.`,
          category: 'sofa',
          price: '549.99'
        },
        {
          id:4,
          title: 'Плоска лампа',
          img: 'wall-light.jpeg',
          desc: `Настінна лампа в сучасному мінімалістичному стилі ідеально підходить для інтер'єрів у стилі лофт або хай-тек, створюючи м'яке підсвічування та затишну атмосферу. Виготовлена з металу та акрилу, що забезпечує довговічність і стильний вигляд. Країна виробника – Китай`,
          category: 'light',
          price: '25.00'
        },
        {
          id:5,
          title: 'Стілець білий',
          img: 'chair-white.jpeg',
          desc: `Стильний білий стілець із ергономічним сидінням і міцними дерев'яними ніжками ідеально підходить для сучасних інтер'єрів. Завдяки поєднанню металевих елементів і натурального дерева він є надійним і довговічним. Матеріал сидіння – екошкіра, каркас – дерево та метал. Країна виробника – Китай`,
          category: 'chairs',
          price: '49.99'
        },
        {
          id:6,
          title: 'Стілець червоний',
          img: 'red-chair.jpeg',
          desc: `Сучасний офісний стілець з яскравим дизайном ідеально доповнить робочий простір завдяки своєму стильному вигляду та функціональності. Ергономічне сидіння забезпечує комфорт навіть під час тривалого використання, а висока спинка підтримує правильну поставу. Модель оснащена зручними підлокітниками та регульованою висотою, що дозволяє легко адаптувати стілець під індивідуальні потреби. Стійка металева основа з п’ятьма коліщатками гарантує мобільність та стабільність. Матеріал оббивки — високоякісна екошкіра, каркас — метал. Країна виробника — Китай.`,
          category: 'chairs',
          price: '74.99'
        },
        {
          id:7,
          title: 'Лампа сіра',
          img: 'light-grey.jpg',
          desc: `Настінна лампа в мінімалістичному скандинавському стилі чудово підходить для сучасних інтер’єрів. Поєднання дерева та металу створює затишну атмосферу й стильний вигляд. Забезпечує м’яке направлене освітлення. Країна виробника – Китай.`,
          category: 'light',
          price: '38.99'
        },
        {
          id:8,
          title: 'Лампа чорна',
          img: 'light-black.webp',
          desc: `Настінна лампа в сучасному стилі з лаконічним чорним корпусом ідеально підходить для інтер’єрів у стилі мінімалізм або хай-тек. Забезпечує спрямоване освітлення вгору й вниз, створюючи затишну атмосферу. Виготовлена з металу. Країна виробника – Китай.`,
          category: 'light',
          price: '38.99'
        },
        {
          id:9,
          title: 'Стіл білий ',
          img: 'table-white.jpg',
          desc: `Письмовий стіл у сучасному мінімалістичному стилі стане ідеальним рішенням для робочого простору або домашнього кабінету. Компактний, з чистим білим дизайном та прямими лініями, він легко впишеться в будь-який інтер’єр. Оснащений двома висувними шухлядами для зберігання. Матеріал – МДФ та метал. Країна виробника – Китай.`,
          category: 'tables',
          price: '109.00'
        },
        {
          id:10,
          title: 'Стіл-книга',
          img: 'table-book.jpg',
          desc: `Стіл-книга у світлому дерев’яному декорі — практичне рішення для економії простору. У складеному вигляді компактний, у розкладеному — зручний для роботи чи обіду. Виготовлений з ламінованого ДСП. Країна виробника — Китай.`,
          category: 'tables',
          price: '129.99'
        },
        {
          id:11,
          title: 'Диван сірий',
          img: 'sofa-grey.jpg',
          desc: `Стильний сірий диван у сучасному дизайні стане комфортним акцентом у будь-якому інтер’єрі. М’яке сидіння з вираженою стібкою забезпечує зручність і затишок. Ідеально підходить для вітальні або зони відпочинку. Оббивка – текстиль. Країна виробника – Вʼєтнам.`,
          category: 'sofa',
          price: '399.99'
        },
        {
          id:12,
          title: 'Диван білий',
          img: 'sofa-white.jpg',
          desc: `Елегантний м’який диван у кремовому кольорі — вдалий вибір для сучасного інтер’єру. Закруглені форми, глибока посадка та фактурна оббивка створюють атмосферу затишку та розкоші. Ідеально підходить для вітальні або зони відпочинку. Оббивка — текстиль букле. Країна виробника — Вʼєтнам.`,
          category: 'sofa',
          price: '475.00'
        },
      ],
      showFullItem: false,
      fullItem: {}
    }
    /* Привязування методів до контексту класу */
    this.state.currentItems = this.state.items
    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)
    this.onShowItem = this.onShowItem.bind(this)
  }
  render() {
    return(
    <div className="wrapper">
      <Header orders={this.state.orders} onDelete={this.deleteOrder}/>
      <Categories chooseCategory={this.chooseCategory}/>
      <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder}/>
      {this.state.showFullItem && <ShowFullitem onAdd={this.addToOrder} onShowItem={this.onShowItem} item={this.state.fullItem}/>}
      <Footer/>
    </div>
    )
  };

  /* Викликає повне відображення товару */
  onShowItem(item){
    this.setState({fullItem: item})
    this.setState({showFullItem: !this.state.showFullItem})
  }

  /* Фільтрація товарів за категоріями */
  chooseCategory(category){
    if(category==='all') {
      /* Показує всі товари */
      this.setState({currentItems: this.state.items})
      return
    }
    
    /* Показує товари певної категорії */
    this.setState({
      currentItems: this.state.items.filter(el =>el.category===category)
    })
  }

  /* Видаляє товар з кошику */
  deleteOrder(id) {
    this.setState({orders: this.state.orders.filter(el=>el.id !== id)})
  }

  /* Додає товар в кошик */
  addToOrder(item) {
    let isInArray = false
    this.state.orders.forEach(el => {
      if(el.id === item.id)
        isInArray = true
    })
    if (!isInArray)
    this.setState({orders: [...this.state.orders, item]})
  }
}

export default App;
