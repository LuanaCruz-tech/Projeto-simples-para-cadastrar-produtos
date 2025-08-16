using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using ProductApi.Models;

namespace ProductApi.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _ctx;
        public ProductRepository(AppDbContext ctx) => _ctx = ctx;

        public async Task<IEnumerable<Product>> GetAllAsync() =>
            await _ctx.Products.AsNoTracking().OrderBy(p => p.Id).ToListAsync();

        public async Task<Product> AddAsync(Product product)
        {
            _ctx.Products.Add(product);
            await _ctx.SaveChangesAsync();
            return product;
        }
    }
}
