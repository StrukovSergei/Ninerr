import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'gigDB'

export const gigService = {
  query,
  getById,
  save,
  remove,
  getEmptyGig,
  // addGigMsg
}
window.cs = gigService

async function query(
  filterBy = { txt: '', minPrice: 0, maxPrice: 0, category: '', delivery: 0, id: '' }
) {
  var gigs = await storageService.query(STORAGE_KEY)

  if (filterBy.searchText) {
    const regex = new RegExp(filterBy.searchText, 'i')
    gigs = gigs.filter(
      (gig) => regex.test(gig.title) || regex.test(gig.description)
    )
  }

  if (filterBy.minPrice) {
    gigs = gigs.filter((gig) => gig.price >= filterBy.minPrice)
  }

  if (filterBy.maxPrice) {
    gigs = gigs.filter((gig) => gig.price <= filterBy.maxPrice)
  }

  if (filterBy.delivery) {
    gigs = gigs.filter((gig) => gig.daysToMake <= filterBy.delivery)
  }

  if (filterBy.category) {
    gigs = gigs.filter((gig) => gig.categories.includes(filterBy.category))
  }

  if (filterBy.id) {
    gigs = gigs.filter((gig) => gig.owner._id.includes(filterBy.id))
  }

  return gigs
}

function getById(gigId) {
  return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
  await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
  var savedGig
  if (gig._id) {
    savedGig = await storageService.put(STORAGE_KEY, gig)
  } else {
    // Later, owner is set by the backend
    gig.owner = userService.getLoggedinUser()
    savedGig = await storageService.post(STORAGE_KEY, gig)
  }
  return savedGig
}

// async function addCarMsg(carId, txt) {
//     // Later, this is all done by the backend
//     const car = await getById(carId)
//     if (!car.msgs) car.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     car.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, car)

//     return msg
// }

function getEmptyGig() {
  return {
    title: 'random gig',
    price: utilService.getRandomIntInclusive(10, 90),
  }
}

// Initial data
// ;(async () => {
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g101',
//     title: 'I will build responsive wordpress website design',
//     price: 12,
//     status: 'pending',
//     owner: {
//       _id: 'u101',
//       fullname: 'Dudu Da',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg',
//       level: 'pro',
//       rate: 4.8,
//       country: 'India',
//       since: 'Nov 2016',
//       response: '3 Hours',
//       lastDelivery: 'Just now',
//       language: ['English', 'Hindi'],
//       about: `I'm Abhi, a passionate graphic designer based in India, with 7+ years of experience. I've worked with many notable clients like Nike, Cisco, EA Sports, DC Pro, Fiverr internal communications, etc. I am specialized in Logo Design and Brand Identity design. I'm available : Mon/Sat- 12am/12pm(EST). Let's connect :)`,
//     },
//     daysToMake: 3,
//     description:
//       `Are you looking for a professional, mobile-friendly, and user-friendly website for your business or organization? Look no further! I am Abhi, a passionate graphic designer with over 7 years of experience based in India. My expertise lies in creating modern and stylish website designs that not only impress your audience but also drive results. I have collaborated with notable clients like Nike, Cisco, EA Sports, and Fiverr internal communications, among others. My services include a fully responsive design that adapts to all devices, a user-friendly interface for seamless navigation, high-quality graphics to enhance your brand's image, and SEO optimization to boost your online visibility. With unlimited revisions, I ensure your complete satisfaction with the final product. Let's connect and bring your vision to life! Available for communication from Monday to Saturday, 12 am to 12 pm (EST).`,
//     imgUrls: [
//       'https://res.cloudinary.com/dcwibf9o5/image/upload/v1673726966/q1msdqaht5dsqu22ip62.webp',
//       'https://res.cloudinary.com/dcwibf9o5/image/upload/v1673726973/jjkh0hwshulmatnflwhz.webp',
//       'https://res.cloudinary.com/dcwibf9o5/image/upload/v1673726960/hm6yg2uc0c3ktwjnw2eg.webp',
//     ],
//     tags: ['proffesional', 'accessible'],
//     likedByUsers: ['mini-user'],
//     info: 'Modern and stylish website design with unlimited revisions',
//     features: [
//       'Fully responsive design',
//       'User-friendly interface',
//       'High-quality graphics',
//       'SEO optimized',
//     ],
//     categories: ['Graphics & Design', 'Digital Marketing'],
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g102',
//     title: 'I will design best custom hand drawn logo with unlimited revisions',
//     price: 36,
//     status: 'pending',
//     owner: {
//       _id: 'u102',
//       fullname: 'Budu Ba',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/044fb5914a845a4eb59fc2b69f7f7b32-1634120039750/4dbc2acb-7322-4cd0-9afb-e5190e8e8a0d.jpg',
//       level: 'basic/premium',
//       rate: 4.6,
//       country: 'India',
//       since: 'Jan 2018',
//       response: '1 Hour',
//       lastDelivery: '6 hours ago',
//       language: ['English', 'Hindi'],
//       about: `Namaste! I'm Mumu, a reliable virtual assistant with a knack for organization and multitasking. With my support, you can focus on what matters most while I handle the rest. Let's streamline your tasks together!`,
//     },
//     daysToMake: 7,
//     description:
//       `Get ready to stand out with a unique and captivating logo design for your brand! I am Budu Ba, a skilled logo maker with a team of talented artists who specialize in creating fully custom-made, creative, original, and AWESOME logo designs. Whether you're a small business or a premium brand, I can craft a logo that perfectly represents your identity. My services include 1 concept with unlimited revisions, logo transparency for versatile use, a high-resolution printable file, and an impressive 3D mockup to showcase your brand in style. With my attention to detail and dedication to perfection, I guarantee a logo that leaves a lasting impression. Let's collaborate and make your brand shine!`,
//     imgUrls: [
//       'https://res.cloudinary.com/dja6gjgcd/image/upload/v1670579338/samples/higherr/ddf38ce88cd6f0ab8ee9c1097f3727a452715f19_xknjtm.webp',
//       'https://res.cloudinary.com/dja6gjgcd/image/upload/v1670579338/samples/higherr/14c7f411ab4958c13cccf3f46e6b3be04797ce59_cp8j4w.webp',
//       'https://res.cloudinary.com/dja6gjgcd/image/upload/v1670579338/samples/higherr/Doc_2_swjqrg_gvb7az.jpg',
//       'https://res.cloudinary.com/dja6gjgcd/image/upload/v1670579338/samples/higherr/ee19f64d39ae8a60c7f7fe39895f733698981c99_sadnfj.webp',
//     ],
//     tags: ['logo-design', 'proffesional'],
//     likedByUsers: ['mini-user'],
//     info: '1 custom logo+high resolution file+3d mockup+logo transparency+ 300dpi',
//     features: [
//       '1 concept included',
//       'Logo transparency',
//       'Printable file',
//       'Include 3D mockup',
//     ],
//     categories: ['Video & Animation', 'Graphics & Design'],
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g103',
//     title: 'I will create modern and stylish website design',
//     price: 25,
//     status: 'rejected',
//     owner: {
//       _id: 'u103',
//       fullname: 'Fifi Fu',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/9f500b4b629e3dcb09a311b29525d40d-1647197131685/eccd2987-a403-4069-a42d-1c844ef2b0b4.jpg',
//       level: 'basic/premium',
//       rate: 4.5,
//       country: 'Spain',
//       since: 'Apr 2017',
//       response: '2 Hours',
//       lastDelivery: '1 day ago',
//       language: ['English', 'Spanish'],
//       about: `Hola! I'm Lulu, a creative illustrator with a passion for bringing ideas to life through art. With over 6 years of experience, I've collaborated with clients worldwide. Let's make your project a visual masterpiece!`,
//     },
//     daysToMake: 5,
//     description:
//       `Impress your audience with a modern and stylish website design that captures attention and leaves a lasting impact. I am Fifi Fu, a creative illustrator with a passion for bringing ideas to life through art. With over 6 years of experience, I have collaborated with clients worldwide to create visually stunning websites. My services include a fully responsive design that adapts to all devices, a user-friendly interface for seamless navigation, high-quality graphics to enhance your brand's image, and SEO optimization to boost your online presence. Though this gig is currently in progress, I assure you the final product will be nothing short of perfection. Let's make your project a visual masterpiece together!`,
//     imgUrls: [
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/124548693/original/f898f0bde16135e197651d044c923661f6d2de08/clone-duplicate-or-create-any-page-or-website-to-divi-theme.png',
//       'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/43aa46e39b0ca1520de3004c84ffc930-1683684175/virgilbrewster.com/clone-duplicate-or-create-any-page-or-website-to-divi-theme.png',
//       'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/3c4f341ce843f556fbdd47fe4fddf617-1673724745/michellealva.comnew-home/clone-duplicate-or-create-any-page-or-website-to-divi-theme.png',
//     ],
//     tags: ['website-design', 'modern'],
//     likedByUsers: [],
//     info: 'Modern and stylish website design with unlimited revisions',
//     features: [
//       'Fully responsive design',
//       'User-friendly interface',
//       'High-quality graphics',
//       'SEO optimized',
//     ],
//     categories: ['AI Services', 'Programming & Tech'],
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g104',
//     title: 'I will provide professional social media marketing services',
//     price: 50,
//     status: 'completed',
//     owner: {
//       _id: 'u104',
//       fullname: 'Gugu Gu',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/3949d5821f00df73d26614f6cd4e1f3d-1240311201670599379.534255/874FB21E-A700-4A74-9F4F-D0C524CBCE38',
//       level: 'pro',
//       rate: 4.9,
//       country: 'United Kingdom',
//       since: 'Nov 2016',
//       response: '5 Hours',
//       lastDelivery: '3 days ago',
//       language: ['English'],
//       about: `Hello there! I'm Kuku, a skilled video editor with a keen eye for detail. I have 7+ years of experience in the industry, and I'm dedicated to delivering polished and captivating videos. Let's bring your footage to life!`,
//     },
//     daysToMake: 10,
//     description:
//       `Boost your brand's online presence with professional social media marketing services that drive results. I am Gugu Gu, a social media marketing expert with a proven track record of success. With 8+ years of experience, I have helped businesses of all sizes achieve their marketing goals. My services include content creation and scheduling to keep your audience engaged, audience targeting to reach the right customers, performance analysis to track progress, and ad campaign management to maximize your ROI. With detailed analytics, I provide insights into the effectiveness of your campaigns. Let's collaborate and take your brand to new heights!`,
//     imgUrls: [
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/174169384/original/a06805520cd70790a09205879fc0677c49953e74/be-your-social-media-marketing-manager-and-content-creator.png',
//       'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/80c8869311384e882c6b8fd9f1cb025d-1690449640/dwayne752%20feed%20preview(1)/be-your-social-media-marketing-manager-and-content-creator.png',
//       'https://fiverr-res.cloudinary.com/images/t_smartwm/t_gig_pdf_gallery_view_ver4,q_auto,f_auto/attachments/delivery/asset/7ea45c9137b47a51ff2ed4846bd79947-1690383421/jolvans%20captions%20revision-1/be-your-social-media-marketing-manager-and-content-creator.pdf',
//       'https://fiverr-res.cloudinary.com/images/t_smartwm/t_gig_pdf_gallery_view_ver4,q_auto,f_auto/attachments/delivery/asset/868c34c494ce8b6dd215bef4c3e1095d-1689926688/sandeepbagoban%20captions%20revision%202/be-your-social-media-marketing-manager-and-content-creator.pdf',
//     ],
//     tags: ['social-media', 'marketing', 'professional'],
//     likedByUsers: [],
//     info: 'Professional social media marketing with detailed analytics',
//     features: [
//       'Content creation and scheduling',
//       'Audience targeting',
//       'Performance analysis',
//       'Ad campaign management',
//     ],
//     categories: ['Writing & Translation', 'Digital Marketing'],
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g105',
//     title: 'I will write engaging and SEO-friendly blog posts',
//     price: 15,
//     status: 'pending',
//     owner: {
//       _id: 'u105',
//       fullname: 'Huhu Ha',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/0d89becb3d4ac31ce9195e7174f0473f-1620254574639/b371c86f-2476-4813-95dd-96c4158d90f7.JPG',
//       level: 'basic/premium',
//       rate: 4.7,
//       country: 'Germany',
//       since: 'May 2018',
//       response: '4 Hours',
//       lastDelivery: '12 hours ago',
//       language: ['English', 'German'],
//       about: `Greetings! I'm Jiju, a passionate graphic designer known for creating eye-catching flyer designs. With my artistic flair and attention to detail, your promotional material will stand out from the crowd. Let's make your brand shine!`,
//     },
//     daysToMake: 2,
//     description:
//       `Get high-quality blog posts that engage your readers and boost your website's SEO. I am Huhu Ha, a talented content writer known for creating captivating and informative blog posts. My services include well-researched content that resonates with your target audience, keyword optimization to improve your search engine rankings, plagiarism-free writing for originality, and quick turnaround times to meet your deadlines. With my writing skills and attention to detail, I ensure each blog post exceeds your expectations. Whether you need content for a beauty and lifestyle blog or any other niche, I've got you covered. Let's create content that leaves a lasting impact!`,
//     imgUrls: [
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/173769270/original/4d73c4c4e249fde66b651e8384e4835772c0d25b/write-content-for-your-beauty-and-lifestyle-blog.png',
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/173769270/original/502392c13e1b777d4a69eb89d51278f90fd4e60f/write-content-for-your-beauty-and-lifestyle-blog.png',
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/173769270/original/9acde2928d80fd32e4f3014de0bbbdfc961cbca7/write-content-for-your-beauty-and-lifestyle-blog.jpg',
//     ],
//     tags: ['blog-writing', 'SEO-friendly'],
//     likedByUsers: [],
//     info: 'SEO-friendly blog posts with keyword research',
//     features: [
//       'Well-researched content',
//       'Keyword optimization',
//       'Plagiarism-free writing',
//       'Quick turnaround',
//     ],
//     categories: ['Photography', 'Music & Audio'],
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g106',
//     title: 'I will create eye-catching flyer designs',
//     price: 20,
//     status: 'progress',
//     owner: {
//       _id: 'u106',
//       fullname: 'Jiju Ja',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/9b8f8d3cd42f034d2b0ab40b885db4f4-1626302890625/b3d6c17c-c9ef-4357-9026-294ec9e3e068.jpg',
//       level: 'basic/premium',
//       rate: 4.2,
//       country: 'Australia',
//       since: 'Aug 2019',
//       response: '1 Hour',
//       lastDelivery: '2 days ago',
//       language: ['English'],
//       about: `Hi, I'm Huhu, a professional content writer specializing in engaging and SEO-friendly blog posts. My words have the power to captivate readers and drive traffic to your website. Let's create compelling content for your audience!`,
//     },
//     daysToMake: 3,
//     description:
//       `Make a statement with eye-catching flyer designs that promote your events or promotions in style. I am Jiju Ja, a professional content writer with a passion for creating compelling visual content. With a keen eye for detail, I craft flyer designs that captivate your audience and deliver your message effectively. My services include customized design options to match your brand's identity, high-resolution print files for quality prints, quick revisions to ensure your satisfaction, and creative and original artwork that stands out from the crowd. Let's collaborate and create flyers that make a lasting impression!`,
//     imgUrls: [
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/35055940/original/093fc49670c402f25619a89439a905d945b1b238/design-professional-clear-business-flyer.png',
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/35055940/original/f381950c405e7a0652067bdf705c2601bab1d5fd/design-professional-clear-business-flyer.jpg',
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/35055940/original/11d68b30ef4462e3099219ac48dcb5913a6377ed/design-professional-clear-business-flyer.jpg',
//     ],
//     tags: ['flyer-design', 'eye-catching'],
//     likedByUsers: [],
//     info: 'Eye-catching flyer designs for various occasions',
//     features: [
//       'Customized design options',
//       'High-resolution print files',
//       'Quick revisions',
//       'Creative and original artwork',
//     ],
//     categories: ['Business', 'AI Services'],
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g107',
//     title: 'I will provide professional video editing services',
//     price: 30,
//     status: 'progress',
//     owner: {
//       _id: 'u107',
//       fullname: 'Kuku Ku',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/1172433/original/j.jpg',
//       level: 'pro',
//       rate: 4.6,
//       country: 'Canada',
//       since: 'Jan 2015',
//       response: '2 Hours',
//       lastDelivery: '6 hours ago',
//       language: ['English', 'French'],
//       about: `Hello! I'm Gugu, a social media marketing expert with a proven track record of success. I have 8+ years of experience helping businesses of all sizes achieve their marketing goals. Let's boost your brand's online presence together!`,
//     },
//     daysToMake: 6,
//     description:
//       `Give your videos a polished and captivating look with professional video editing services. I am Kuku Ku, a skilled video editor with 7+ years of experience in the industry. My services include video color grading to enhance visuals, audio enhancement for crystal-clear sound, motion graphics for added visual appeal, and custom animations to bring your footage to life. Whether you're creating content for social media, websites, or any other platform, I ensure your videos leave a lasting impact on your audience. Let's collaborate and take your videos to the next level!`,
//     imgUrls: [
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/289213291/original/cab40eb7567465c82d59f2c6d7395e78734317d2/do-professional-creative-video-edit-for-facebook-and-youtube.png',
//     ],
//     tags: ['video-editing', 'professional'],
//     likedByUsers: [],
//     info: 'Professional video editing with visual effects and transitions',
//     features: [
//       'Video color grading',
//       'Audio enhancement',
//       'Motion graphics',
//       'Custom animations',
//     ],
//     categories: ['Photography', 'Music & Audio'],
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g108',
//     title: 'I will create custom illustrations for your project',
//     price: 40,
//     status: 'progress',
//     owner: {
//       _id: 'u108',
//       fullname: 'Lulu Lu',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/1643be003b678a94e6f2ab861276d472-939741421598993603203/JPEG_20200901_165322_1030903637663592876.jpg',
//       level: 'basic/premium',
//       rate: 4.8,
//       country: 'United States',
//       since: 'Dec 2017',
//       response: '6 Hours',
//       lastDelivery: '1 day ago',
//       language: ['English'],
//       about: `Hi there! I'm Fifi, a creative web designer with a passion for crafting modern and stylish websites. With over 5 years of experience, I've worked with clients from various industries, delivering stunning results every time. Let's collaborate and bring your vision to life!`,
//     },
//     daysToMake: 8,
//     description:
//       `Enhance your project with unique and creative custom illustrations that leave a lasting impression. I am Lulu Lu, a creative web designer with over 5 years of experience in illustration. My services include personalized illustrations that align with your project's theme and style, quick delivery to meet your deadlines, and full ownership rights for unlimited usage. Whether you need illustrations for children's books, website designs, or any other project, I can bring your ideas to life through art. Let's collaborate and create illustrations that tell your story!`,
//     imgUrls: [
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/169347675/original/9681d62d3c532ab70d3160d81de051e621ae4ca4/draw-a-car-motorcyle-vehicle-and-animate-it.jpg',
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/169347675/original/dadd0fab5e9788dcfe8f30f089b6de0608eb0c47/draw-a-car-motorcyle-vehicle-and-animate-it.jpeg',
//       'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/f96f8aafed3bfa93c794946ed7264125-1689345150/Abunajeeb3_2rev_without_text/draw-a-car-motorcyle-vehicle-and-animate-it.png',
//       'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/98267b16e84f74864fc063f3e63ac970-1689234608/Abunajeeb2/draw-a-car-motorcyle-vehicle-and-animate-it.jpg',
//     ],
//     tags: ['custom-illustrations', 'creative'],
//     likedByUsers: [],
//     info: 'Custom illustrations for books, websites, and branding',
//     features: [
//       'Unique hand-drawn artwork',
//       'Vector file format',
//       'Unlimited revisions',
//       'Commercial use rights',
//     ],
//     categories: ['Photography', 'Music & Audio'],
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g109',
//     title: 'I will provide virtual assistant services',
//     price: 18,
//     status: 'rejected',
//     owner: {
//       _id: 'u109',
//       fullname: 'Mumu Mu',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/c1bf7fa52003d4e01f32bf2ffc13eda4-846921031687736065.32306/27E1B7AF-E6E3-4D76-A6D0-66761E0B5FD8',
//       level: 'pro',
//       rate: 4.3,
//       country: 'Germany',
//       since: 'May 2018',
//       response: '4 Hours',
//       lastDelivery: '12 hours ago',
//       language: ['English', 'German'],
//       about: `Greetings! I'm Jiju, a passionate graphic designer known for creating eye-catching flyer designs. With my artistic flair and attention to detail, your promotional material will stand out from the crowd. Let's make your brand shine!`,
//     },
//     daysToMake: 4,
//     description:
//       `Elevate your videos, commercials, and narrations with professional voice over services that add a touch of excellence. I am Mama Ma, a voice over artist with a melodious and versatile voice. My services include high-quality audio recordings with studio-grade equipment, quick turnaround times to meet your deadlines, and multiple revisions to ensure your satisfaction. Whether you need a warm and friendly tone or a captivating and authoritative voice, I can deliver the perfect voice over that suits your project's needs. Let's collaborate and bring your content to life with exceptional voice overs!`,
//     imgUrls: [
//       'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/215431426/original/3da3155be9bd3e63aa73e322c067c0c1c6f63383/be-your-virtual-assistant-for-data-entry-data-mining-typing-web-research.jpg',
//       'https://fiverr-res.cloudinary.com/images/w_1260,q_auto,f_auto,pg_1/attachments/delivery/asset/e17f222458f1877bbfb7a6f60dd9a895-1680368139/Logo-Updated/be-your-virtual-assistant-for-data-entry-data-mining-typing-web-research',
//       'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/13707a59ced55e8af5518414523ffe6d-1641709085/image_2022_01_09T06_12_51_352Z/be-your-virtual-assistant-for-data-entry-data-mining-typing-web-research.png',
//     ],
//     tags: ['virtual-assistant', 'productivity'],
//     likedByUsers: [],
//     info: 'Experienced virtual assistant for efficient task management',
//     features: [
//       'Data entry and organization',
//       'Email and calendar management',
//       'Web research',
//       'Document preparation',
//     ],
//     categories: ['Business', 'Writing & Translation', 'Digital Marketing'],
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g110',
//     title: 'I will translate documents between English and Spanish',
//     price: 12,
//     status: 'completed',
//     owner: {
//       _id: 'u110',
//       fullname: 'Nunu Nu',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/ad7178fcf838c1965e1dc5b33b375243-1603730199570/6f0cb0e2-4777-4b23-adbe-b79b8c78b82c.png',
//       level: 'basic/premium',
//       rate: 4.9,
//       country: 'United Kingdom',
//       since: 'Nov 2016',
//       response: '5 Hours',
//       lastDelivery: '3 days ago',
//       language: ['English'],
//       about: `Hello there! I'm Kuku, a skilled video editor with a keen eye for detail. I have 7+ years of experience in the industry, and I'm dedicated to delivering polished and captivating videos. Let's bring your footage to life!`,
//     },
//     daysToMake: 2,
//     description:
//       `Unlock the power of data with AI-powered data analysis services that provide valuable insights and drive informed decision-making. I am Nunu Nu, a data scientist with a passion for harnessing the potential of artificial intelligence. My services include data preprocessing to ensure accuracy, machine learning algorithms for predictive analysis, and data visualization to present findings in a clear and concise manner. Whether you need to analyze customer behavior, financial trends, or any other data-driven insights, I can help you make sense of complex data sets. Let's collaborate and uncover the hidden patterns in your data!`,
//     imgUrls: [
//       'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/180205136/original/31f37986ef5c773f8304a7b1c109bbd459446afb/translate-handwritten-documents-from-russian-ukrainian-into-english.jpg',
//       'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/180205136/original/cff327673a51840e53219b9005794f4ac5bd0ee7/translate-handwritten-documents-from-russian-ukrainian-into-english.jpg',
//     ],
//     tags: ['translation', 'English-Spanish'],
//     likedByUsers: [],
//     info: 'Accurate translation with attention to cultural nuances',
//     features: [
//       'Proofreading and editing',
//       'Fast turnaround time',
//       'Confidentiality assurance',
//       'Localized translations',
//     ],
//     categories: ['Writing & Translation'],
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g111',
//     title: 'I will design unique and creative t-shirt graphics',
//     price: 22,
//     status: 'progress',
//     owner: {
//       _id: 'u111',
//       fullname: 'Ouou Oa',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/77aa04a51d12a47a9dd663a58f1e040f-695136681685414307344/JPEG_20230530_073824_4160025611441147309.jpg',
//       level: 'basic/premium',
//       rate: 4.5,
//       country: 'India',
//       since: 'Jan 2018',
//       response: '1 Hour',
//       lastDelivery: '6 hours ago',
//       language: ['English', 'Hindi'],
//       about: `Namaste! I'm Mumu, a reliable virtual assistant with a knack for organization and multitasking. With my support, you can focus on what matters most while I handle the rest. Let's streamline your tasks together!`,
//     },
//     daysToMake: 5,
//     description:
//       'Stand out with custom and creative t-shirt graphics for your brand.',
//     imgUrls: [
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/104718396/original/1e0b01d1a3436421057d972b37e26c13d2200d32/make-creative-excellent-t-shirt-design.jpg',
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/104718396/original/3e2e8c00f5b7dd3eff283ab78fa23246b2a5d2d4/make-creative-excellent-t-shirt-design.jpg',
//       'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/104718396/original/90806bfa84c0418c6dd57ccccd4ea5eb8202a1ec/make-creative-excellent-t-shirt-design.jpg',
//     ],
//     tags: ['t-shirt-design', 'creative'],
//     likedByUsers: [],
//     info: 'Custom t-shirt designs for merchandise and apparel',
//     features: [
//       'Variety of design styles',
//       'Multiple color options',
//       'Print-ready files',
//       'Editable source files',
//     ],
//     categories: ['Graphics & Design', 'Photography'],
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g112',
//     title: 'I will provide professional voice-over services',
//     price: 28,
//     status: 'pending',
//     owner: {
//       _id: 'u112',
//       fullname: 'Pupu Pa',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/0abd97962ff9b1846d70a59afc509019-1376642671675088247.55062/840047FC-8953-4B50-9FF8-7B7B22F4ADA5',
//       level: 'pro',
//       rate: 4.7,
//       country: 'United States',
//       since: 'Dec 2017',
//       response: '6 Hours',
//       lastDelivery: '1 day ago',
//       language: ['English'],
//       about: `Hi there! I'm Fifi, a creative web designer with a passion for crafting modern and stylish websites. With over 5 years of experience, I've worked with clients from various industries, delivering stunning results every time. Let's collaborate and bring your vision to life!`,
//     },
//     daysToMake: 3,
//     description:
//       'Get high-quality voice-over recordings for your videos or audio projects.',
//     imgUrls: [
//       'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/301655735/original/b4f75ba4740d3e84413dfb1ea6f72604c9921f18.png',
//       'https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/301655735/original/b4f75ba4740d3e84413dfb1ea6f72604c9921f18.png',
//     ],
//     tags: ['voice-over', 'professional'],
//     likedByUsers: [],
//     info: 'Unique and professional voice service',
//     features: ['Custom voice', 'High-resolution files', 'Unlimited revisions'],
//     categories: ['Writing & Translation', 'Music & Audio'],
//   })
// })()
