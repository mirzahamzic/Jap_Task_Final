using JapTask1.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapTask1.Core.Dtos.Request
{
    public class IngredientSearch : BaseSearch
    {
        public string Name { get; set; }
        public int? Id { get; set; }
        public string SortBy { get; set; }
        public string SortMethod { get; set; }
        public double? minRange { get; set; }
        public double? maxRange { get; set; }
        public Units? Measure { get; set; }
    }
}
