"use client"
import { useState , useEffect} from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"


export default function Home() {

  const [genes, setGenes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const geneList = ["BRCA1", "TP53", "EGFR", "PTEN", "CFTR", "KRAS", "MYC", "RB1", "VEGFA", "APOE"]
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
    {isLoading ? <p>Loading...</p> : <p>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={genes}>
       <XAxis dataKey="gene" />
       <YAxis />
       <Tooltip />
       <Bar dataKey="length" fill="#3bf679" />
      </BarChart>
     </ResponsiveContainer>
    </p>}
  </main>
)


}



