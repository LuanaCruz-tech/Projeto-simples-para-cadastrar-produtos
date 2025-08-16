using ProductApi.DTOs;
using ProductApi.Models;
using ProductApi.Repositories;

namespace ProductApi.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repo;
        public ProductService(IProductRepository repo) => _repo = repo;

        public async Task<IEnumerable<ProductDto>> GetAllAsync()
        {
            var items = await _repo.GetAllAsync();
            return items.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Category = p.Category
            });
        }

        public async Task<ProductDto> CreateAsync(CreateProductDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name)) throw new ArgumentException("Nome obrigatório.");
            if (dto.Price < 0) throw new ArgumentException("Preço inválido.");

            var entity = new Product
            {
                Name = dto.Name.Trim(),
                Price = dto.Price,
                Category = dto.Category.Trim()
            };

            var saved = await _repo.AddAsync(entity);

            return new ProductDto
            {
                Id = saved.Id,
                Name = saved.Name,
                Price = saved.Price,
                Category = saved.Category
            };
        }
    }
}
