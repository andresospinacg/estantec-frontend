import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, ShoppingCart, User, Menu, X, Calendar, Cpu, Smartphone, Laptop, Tablet, Headphones, ArrowLeft, MessageSquare, Send, Loader } from 'lucide-react';

// Importar servicios de API
import {
  dispositivosAPI,
  marcasAPI,
  categoriasAPI,
  transformDispositivoFromAPI,
  transformMarcaFromAPI,
  transformCategoriaFromAPI
} from './data/apiService';

const EstanTecApp = () => {
  // Estado para datos de la API
  const [devices, setDevices] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado del componente
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('Todos');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [selectedImage, setSelectedImage] = useState(0);

  // Cargar datos desde la API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cargar dispositivos con relaciones
        const dispositivosResponse = await dispositivosAPI.getAll();
        const dispositivosData = dispositivosResponse.dispositivos.map(transformDispositivoFromAPI);
        setDevices(dispositivosData);

        // Cargar marcas
        const marcasResponse = await marcasAPI.getAll();
        const marcasData = marcasResponse.marcas.map(transformMarcaFromAPI);
        setMarcas(marcasData);

        // Cargar categorías
        const categoriasResponse = await categoriasAPI.getAll();
        const categoriasData = categoriasResponse.categorias || categoriasResponse;
        setCategorias(categoriasData);

        // Por ahora usar reseñas simuladas hasta implementar reseñas API
        setReviews([]);

      } catch (err) {
        console.error('Error loading data:', err);
        setError('Error al cargar los datos. Verifica que el servidor backend esté ejecutándose.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Construir categorías dinámicamente desde la API
  const categories = [
    { id: 'all', name: 'Todos', icon: Cpu },
    ...categorias.map(cat => ({
      id: cat.nombre.toLowerCase(),
      name: cat.nombre,
      icon: cat.nombre === 'Smartphones' ? Smartphone :
            cat.nombre === 'Laptops' ? Laptop :
            cat.nombre === 'Tablets' ? Tablet :
            cat.nombre === 'Audio' ? Headphones : Cpu
    }))
  ];

  // Construir marcas dinámicamente desde la API
  const brands = ['Todos', ...marcas.map(marca => marca.nombre)];

  // Filtrar y ordenar dispositivos
  const filteredDevices = devices
    .filter(device => {
      const matchesSearch = device.nomre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           device.marca.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || device.categoria.nombre.toLowerCase() === selectedCategory;
      const matchesBrand = selectedBrand === 'Todos' || device.marca.nombre === selectedBrand;
      return matchesSearch && matchesCategory && matchesBrand;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest': return new Date(b.fecha_actualizacion) - new Date(a.fecha_actualizacion);
        case 'oldest': return new Date(a.fecha_actualizacion) - new Date(b.fecha_actualizacion);
        case 'price-low': return a.precio - b.precio;
        case 'price-high': return b.precio - a.precio;
        case 'rating': return b.calificacion_promedio - a.calificacion_promedio;
        default: return 0;
      }
    });

  const addReview = () => {
    if (!newReview.comment.trim()) return;
    
    const review = {
      id: reviews.length + 1,
      deviceId: selectedDevice.id,
      user: "Usuario Actual",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([...reviews, review]);
    setNewReview({ rating: 5, comment: '' });
  };

  const getDeviceReviews = (deviceId) => {
    return reviews.filter(review => review.deviceId === deviceId);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price * 1000); // Simulando conversión a pesos colombianos
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Cargando EstanTec</h2>
          <p className="text-gray-600">Conectando con el servidor...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <X className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error de conexión</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (selectedDevice) {
    const deviceReviews = getDeviceReviews(selectedDevice.id);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedDevice(null)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Volver a la tienda</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">EstanTec</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        {/* Device Detail */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={Array.isArray(selectedDevice.imagenes_galeria) && selectedDevice.imagenes_galeria[selectedImage]
                    ? selectedDevice.imagenes_galeria[selectedImage]
                    : selectedDevice.url_imagen}
                  alt={selectedDevice.nomre}
                  className="w-full h-full object-cover"
                />
              </div>
              {Array.isArray(selectedDevice.imagenes_galeria) && selectedDevice.imagenes_galeria.length > 1 && (
                <div className="flex space-x-2">
                  {selectedDevice.imagenes_galeria.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{selectedDevice.nomre}</h1>
                <p className="text-xl text-gray-600 mt-1">{selectedDevice.marca.nombre}</p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(selectedDevice.calificacion_promedio)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {selectedDevice.calificacion_promedio} ({selectedDevice.total_reseñas} reseñas)
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-4xl font-bold text-blue-600">{formatPrice(selectedDevice.precio)}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Lanzado el {formatDate(selectedDevice.fecha_actualizacion)}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                <p className="text-gray-700">{selectedDevice.descripcion}</p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Especificaciones</h3>
                <div className="grid grid-cols-1 gap-3">
                  {selectedDevice.especificaciones.split('\n').map((spec, index) => {
                    const [key, value] = spec.split(': ');
                    return (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600 capitalize font-medium">
                          {key?.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-gray-900 text-right">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Agregar al Carrito</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2" />
              Reseñas ({deviceReviews.length})
            </h2>

            {/* Add Review Form */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Escribir una reseña</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Calificación</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setNewReview({...newReview, rating})}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            rating <= newReview.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          } hover:text-yellow-400 transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comentario</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="4"
                    placeholder="Comparte tu experiencia con este producto..."
                  />
                </div>
                <button
                  onClick={addReview}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Publicar Reseña</span>
                </button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {deviceReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{review.user}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
              
              {deviceReviews.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Aún no hay reseñas para este producto.</p>
                  <p className="text-gray-400 text-sm">¡Sé el primero en escribir una!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-blue-600">EstanTec</h1>
            <p className="hidden md:block text-gray-600">Descuentos de hasta 20% compras mayores a 6 millones COP</p>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
            >
              {showFilters ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar dispositivos, marcas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className={`space-y-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Categorías</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Más recientes</option>
                  <option value="oldest">Más antiguos</option>
                  <option value="price-low">Precio: menor a mayor</option>
                  <option value="price-high">Precio: mayor a menor</option>
                  <option value="rating">Mejor calificados</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'Todos los Dispositivos' : 
             categories.find(cat => cat.id === selectedCategory)?.name}
          </h2>
          <span className="text-gray-600">
            {filteredDevices.length} producto{filteredDevices.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Products Grid */}
        {filteredDevices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDevices.map((device) => (
              <div
                key={device.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                onClick={() => setSelectedDevice(device)}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={device.url_imagen}
                    alt={device.nomre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {device.nomre}
                    </h3>
                    {device.estado_activo && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Disponible
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{device.marca.nombre}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(device.calificacion_promedio)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {device.calificacion_promedio} ({device.total_reseñas})
                    </span>
                  </div>
                  
                  {/* Price and Date */}
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-blue-600">
                      {formatPrice(device.precio)}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(device.fecha_actualizacion)}
                    </div>
                  </div>
                </div>
                
                {/* Hover Actions */}
                <div className="p-4 pt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <span>Ver Detalles</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-600 mb-4">
                Intenta ajustar los filtros o términos de búsqueda
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedBrand('Todos');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        )}

        {/* Featured Categories Section */}
        {selectedCategory === 'all' && searchTerm === '' && (
          <div className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Explora por Categorías
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.slice(1).map((category) => {
                const IconComponent = category.icon;
                const categoryDevices = devices.filter(d => d.categoria.nombre.toLowerCase() === category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-300"
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-600 transition-colors">
                        <IconComponent className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {categoryDevices.length} productos
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Stats Section */}
        {filteredDevices.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">¿Por qué elegir EstanTec?</h2>
              <p className="text-blue-100">Tu tienda de confianza para dispositivos inteligentes</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{devices.length}+</div>
                <div className="text-blue-100">Productos disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">4.8★</div>
                <div className="text-blue-100">Calificación promedio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-blue-100">Clientes satisfechos</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">EstanTec</h3>
              <p className="text-gray-400 mb-4">
                Tu destino para los dispositivos inteligentes más innovadores. 
                Calidad garantizada y precios competitivos.
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors">
                  <User className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categorías</h4>
              <ul className="space-y-2 text-gray-400">
                {categories.slice(1).map(category => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className="hover:text-white transition-colors"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Garantías</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Envíos</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 <a href="https://estandartecnologia.com" className="hover:text-white transition-colors">EstanTec</a>. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return <EstanTecApp />;
}

export default App;
