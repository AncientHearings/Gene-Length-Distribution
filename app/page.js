"use client"
import { useState , useEffect} from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"


export default function Home() {

  const [genes, setGenes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const geneList = [
  "BRCA1", "TP53", "EGFR", "PTEN", "CFTR", "KRAS", "MYC", "RB1", "VEGFA", "APOE",

  "BRCA2", "AKT1", "PIK3CA", "CDK2", "CDK4", "CDKN1A", "CDKN2A", "BRAF", "NRAS", "HRAS",
  "SMAD4", "SMAD2", "SMAD3", "JAK2", "STAT3", "MAPK1", "MAPK3", "ERBB2", "ERBB3", "ERBB4",
  "FGFR1", "FGFR2", "FGFR3", "PDGFRA", "PDGFRB", "KIT", "MET", "NOTCH1", "NOTCH2", "NOTCH3",
  "WNT1", "WNT3A", "CTNNB1", "GSK3B", "AXIN1", "AXIN2", "TGFBR1", "TGFBR2", "FOXO1", "FOXO3",
  "MTOR", "HIF1A", "VHL", "SOD1", "FASN", "PPARG", "NFKB1", "NFKBIA", "IL6", "TNF"
  ]
  useEffect(() => {
  Promise.all(geneList.map(gene => 
    fetch(`https://rest.ensembl.org/lookup/symbol/homo_sapiens/${gene}?content-type=application/json`)
      .then(res => res.json())
  )).then(results => {
  const cleaned = results.map(d => ({
    gene: d.display_name,
    chromosome: d.seq_region_name,
    length: d.end - d.start
  }))
  console.log(cleaned)
  setGenes(cleaned)
  setIsLoading(false)
})
}, [])

  
  return (
  <main className="min-h-screen bg-gray-950 text-white p-10">
    <h1 className="text-3xl font-bold text-blue-400">Gene Length Distribution</h1>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={genes}>
            <XAxis dataKey="gene" angle={-45} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="length" fill="#3bf679" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}
  </main>
)
}



