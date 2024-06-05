import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

import { GET } from "@/app/utils/http-client";
import { formatCurrency } from "@/app/utils/formatters";

type AccountStatementDocumentProps = {
  account: any;
  customer: any;
  data: any[];
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
    gap: "10px",
    margin: 10,
    padding: 10,
  },
  section: {
    flexGrow: 1,
    flexDirection: "column",
    width: "100%",
    gap: "2px",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

export function AccountStatementDocument({
  account,
  customer,
  data,
}: AccountStatementDocumentProps) {
  const [bank, setBank] = useState<any>({});

  useEffect(() => {
    const fetchBank = async () => {
      const response = await GET(`/banks/${customer.bank_id}`);
      const data = await response.json();
      setBank(data);
    };

    fetchBank();
  }, [customer]);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.section}>
            <Text
              style={{ fontFamily: "Helvetica-Bold", fontWeight: "extrabold" }}
            >
              {bank?.name}
            </Text>
            <Text style={{ fontSize: "10" }}>
              Door The Money Game &mdash; Jouw Online Bank Simulatie
            </Text>
          </View>
          <View
            style={[styles.section, { textAlign: "right", paddingRight: 20 }]}
          >
            <Text>{account.name} Afrekening</Text>
            <Text style={{ fontSize: "10" }}>Rekening Nr. {account.id}</Text>
          </View>
        </View>
        <View style={{ gap: "5px" }}>
          <Text style={{ textTransform: "capitalize" }}>
            {customer.first_name} {customer.last_name}
          </Text>
          <View
            style={{ backgroundColor: "#f6f8f1", padding: 5, marginRight: 20 }}
          >
            <Text style={{ fontSize: "10" }}>
              Afrekeningsperiode voor februari 2024
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              gap: "10",
              backgroundColor: "#1d692f",
              color: "white",
              padding: 5,
              marginRight: 20,
              fontSize: "12",
            }}
          >
            <Text style={{ width: "100" }}>Datum</Text>
            <Text style={{ width: "200" }}>Omschrijving</Text>
            <Text style={{ width: "100" }}>Opnames</Text>
            <Text style={{ width: "100" }}>Stortingen</Text>
            <Text style={{ width: "100" }}>Balans</Text>
          </View>

          {data.map((records, index) => {
            return (
              <View
                key={index}
                style={{
                  fontSize: "12",
                  flexDirection: "row",
                  gap: "10",
                  padding: "5",
                  maxWidth: "100%",
                  overflow: "hidden",
                  marginRight: "20",
                  backgroundColor: index % 2 === 0 ? "white" : "#def5d9",
                }}
              >
                {records.map((record: any, recordIndex: number) => {
                  return (
                    <Text
                      key={recordIndex}
                      style={{
                        width: recordIndex === 1 ? "200" : "100",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {record.length > 25
                        ? record.slice(0, 25) + "..."
                        : record}
                    </Text>
                  );
                })}
              </View>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "20",
          }}
        >
          <Text style={{ fontSize: "12" }}>**Eindbalans**</Text>
          <Text>{data.at(-1)?.at(-1)}</Text>
        </View>
      </Page>
    </Document>
  );
}
